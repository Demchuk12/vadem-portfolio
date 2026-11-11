import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { VdBadge } from '@vadem/ui/badge';
import { VdCard, VdCardHeader, VdCardTitle } from '@vadem/ui/card';
import { VdLineChart } from '@vadem/ui/chart';
import { vdLocaleEn, vdLocaleProvider, vdLocaleUk } from '@vadem/ui/locale';
import { VdStat } from '@vadem/ui/stat';
import type { Lang } from './data';

const POINTS = 24;
const SETPOINT = 72;
const TICK_MS = 1600;

const TEXT = {
  uk: {
    title: 'Монітор лінії',
    live: 'Демо',
    temp: 'Температура',
    pressure: 'Тиск',
    chart: 'Відхилення від уставки 72 °C',
    chartDesc: 'Останні 40 секунд',
    note: 'Симульовані дані. Компоненти @vadem/ui, оновлення через Angular signals.',
  },
  en: {
    title: 'Line monitor',
    live: 'Demo',
    temp: 'Temperature',
    pressure: 'Pressure',
    chart: 'Deviation from 72 °C setpoint',
    chartDesc: 'Last 40 seconds',
    note: 'Simulated data. @vadem/ui components, updated with Angular signals.',
  },
} as const;

/** Bounded random walk, so the line wanders but stays plausible. */
function step(prev: number, min: number, max: number, jitter: number): number {
  const next = prev + (Math.random() - 0.5) * jitter * 2;
  return Math.round(Math.min(max, Math.max(min, next)) * 10) / 10;
}

function seed(): number[] {
  const out = [72];
  for (let i = 1; i < POINTS; i++) out.push(step(out[i - 1], 66, 80, 0.9));
  return out;
}

/**
 * Hero showcase: a small "plant monitor" built from @vadem/ui, fed by a simulated stream.
 * Ticks only while visible on screen and while the tab is in the foreground.
 */
@Component({
  selector: 'pf-live-demo',
  imports: [VdBadge, VdCard, VdCardHeader, VdCardTitle, VdLineChart, VdStat],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article vdCard variant="raised" class="demo" aria-describedby="demo-note">
      <header vdCardHeader>
        <h2 vdCardTitle class="demo__title">{{ t().title }}</h2>
        <span vdBadge variant="success" dot class="demo__live">{{ t().live }}</span>
      </header>
      <div class="demo__stats">
        <vd-stat size="sm" [label]="t().temp" [value]="tempText()" [delta]="tempDelta().text"
                 [trend]="tempDelta().trend" />
        <vd-stat size="sm" [label]="t().pressure" [value]="pressureText()" />
      </div>
      <vd-line-chart [title]="t().chart" [description]="t().chartDesc" [height]="150"
                     [categories]="labels()" [series]="series()" [format]="fmtDev" />
      <p class="demo__note" id="demo-note">{{ t().note }}</p>
    </article>
  `,
  styles: `
    :host { display: block; }
    .demo { gap: var(--vd-space-4); position: relative; overflow: hidden; }
    .demo::before { content: ''; position: absolute; inset: -40% -20% auto auto; inline-size: 18rem; block-size: 18rem;
      background: radial-gradient(closest-side, color-mix(in oklch, var(--vd-color-action) 22%, transparent), transparent);
      pointer-events: none; }
    .demo__title { font-size: var(--vd-text-md); margin: 0; }
    .demo__stats { margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: var(--vd-space-3); }
    .demo__note { margin: 0; font-size: var(--vd-text-xs); color: var(--vd-color-text-subtle); }
    .demo__live { animation: pf-pulse 2s var(--vd-ease-in-out) infinite; }
    @keyframes pf-pulse { 50% { opacity: 0.55; } }
    @media (prefers-reduced-motion: reduce) { .demo__live { animation: none; } }
  `,
})
export class PfLiveDemo {
  readonly lang = input<Lang>('uk');

  private readonly doc = inject(DOCUMENT);
  protected readonly t = computed(() => TEXT[this.lang()]);
  private readonly temps = signal<number[]>(seed());
  private readonly pressure = signal(4.2);
  private readonly stamps = signal<number[]>(
    Array.from({ length: POINTS }, (_, i) => Date.now() - (POINTS - 1 - i) * TICK_MS),
  );

  private readonly num = computed(
    () => new Intl.NumberFormat(this.lang() === 'uk' ? 'uk-UA' : 'en-US', { maximumFractionDigits: 1, minimumFractionDigits: 1 }),
  );
  protected readonly fmt = (n: number) => `${this.num().format(n)} °C`;
  protected readonly fmtDev = (n: number) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${this.num().format(Math.abs(n))} °C`;
  protected readonly tempText = computed(() => this.fmt(this.temps().at(-1) ?? 0));
  protected readonly pressureText = computed(() => `${this.num().format(this.pressure())} bar`);
  protected readonly tempDelta = computed(() => {
    const v = this.temps();
    const d = Math.round(((v.at(-1) ?? 0) - (v.at(-2) ?? 0)) * 10) / 10;
    return { text: `${d >= 0 ? '+' : '−'}${this.num().format(Math.abs(d))}`, trend: d > 0 ? 'up' : d < 0 ? 'down' : 'flat' } as const;
  });
  protected readonly series = computed(() => [
    { name: this.t().temp, values: this.temps().map((v) => Math.round((v - SETPOINT) * 10) / 10) },
  ]);
  protected readonly labels = computed(() => {
    const f = new Intl.DateTimeFormat(this.lang() === 'uk' ? 'uk-UA' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return this.stamps().map((s) => f.format(s));
  });

  constructor() {
    const host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      let onScreen = false;
      let timer: ReturnType<typeof setInterval> | undefined;
      const sync = () => {
        const run = onScreen && this.doc.visibilityState === 'visible';
        if (run && !timer) timer = setInterval(() => this.tick(), TICK_MS);
        if (!run && timer) { clearInterval(timer); timer = undefined; }
      };
      // Without IntersectionObserver (old browsers, tests) the demo simply stays static.
      if (typeof IntersectionObserver === 'undefined') return;
      const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); });
      io.observe(host);
      this.doc.addEventListener('visibilitychange', sync);
      destroyRef.onDestroy(() => {
        io.disconnect();
        this.doc.removeEventListener('visibilitychange', sync);
        if (timer) clearInterval(timer);
      });
    });
  }

  private tick(): void {
    this.temps.update((v) => [...v.slice(1), step(v.at(-1) ?? 72, 66, 80, 0.9)]);
    this.pressure.update((p) => step(p, 3.8, 4.6, 0.05));
    this.stamps.update((s) => [...s.slice(1), Date.now()]);
  }
}

/** Locale wrappers: Vadem resolves component strings from DI, so each language gets its own subtree. */
@Component({
  selector: 'pf-live-demo-uk',
  imports: [PfLiveDemo],
  providers: [vdLocaleProvider(vdLocaleUk)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<pf-live-demo lang="uk" />`,
})
export class PfLiveDemoUk {}

@Component({
  selector: 'pf-live-demo-en',
  imports: [PfLiveDemo],
  providers: [vdLocaleProvider(vdLocaleEn)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<pf-live-demo lang="en" />`,
})
export class PfLiveDemoEn {}
