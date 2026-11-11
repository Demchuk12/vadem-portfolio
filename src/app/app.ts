import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { VdBadge } from '@vadem/ui/badge';
import { VdButton } from '@vadem/ui/button';
import { VdCopyButton } from '@vadem/ui/copy-button';
import {
  VdCard,
  VdCardHeader,
  VdCardTitle,
} from '@vadem/ui/card';
import { VdIcon } from '@vadem/ui/icon';
import { VdSegment, VdSegmented } from '@vadem/ui/segmented';
import { VdStat } from '@vadem/ui/stat';
import {
  VdTimeline,
  VdTimelineItem,
  VdTimelineTime,
  VdTimelineTitle,
} from '@vadem/ui/timeline';
import { PfBrandIcon, brandOf } from './brand-icon';
import { PfCerts } from './certs';
import { PfCvMenu } from './cv-menu';
import { PfLiveDemoEn, PfLiveDemoUk } from './live-demo';
import { PfReveal } from './reveal';
import { PfTechDashboard } from './tech-dashboard';
import { COPY, JOBS, type Lang, PROFILE, PROJECTS } from './data';

type Theme = 'auto' | 'light' | 'dark';

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: the choice just won't persist */
  }
}

@Component({
  selector: 'pf-root',
  imports: [
    PfBrandIcon,
    PfCerts,
    PfCvMenu,
    PfLiveDemoEn,
    PfLiveDemoUk,
    PfReveal,
    PfTechDashboard,
    VdBadge,
    VdButton,
    VdCopyButton,
    VdCard,
    VdCardHeader,
    VdCardTitle,
    VdIcon,
    VdSegment,
    VdSegmented,
    VdStat,
    VdTimeline,
    VdTimelineItem,
    VdTimelineTime,
    VdTimelineTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly doc = inject(DOCUMENT);

  protected readonly profile = PROFILE;
  protected readonly brandOf = brandOf;
  protected readonly projects = PROJECTS;
  protected readonly year = new Date().getFullYear();

  protected readonly lang = signal<Lang>(
    read('pf-lang') === 'en' ? 'en' : read('pf-lang') === 'uk' ? 'uk' : this.detectLang(),
  );
  protected readonly theme = signal<Theme>(this.initialTheme());
  /** Section currently in view, for the nav highlight. */
  protected readonly active = signal<string>('');
  /** The mobile tab bar stays out of the way while the hero (with its own CTAs) is on screen. */
  protected readonly pastHero = computed(() => this.active() !== '' && this.active() !== 'top');
  /** Older jobs stay collapsed until asked for. */
  protected readonly showAllJobs = signal(false);
  protected readonly visibleJobsCount = 3;
  protected readonly sections = [
    { id: 'experience', icon: 'activity' },
    { id: 'stack', icon: 'layout-dashboard' },
    { id: 'projects', icon: 'folder' },
    { id: 'contact', icon: 'mail' },
  ] as const;

  protected readonly t = computed(() => COPY[this.lang()]);
  /** Jobs as render-ready rows, newest first (the data is already in that order). */
  protected readonly jobs = computed(() => {
    const l = this.lang();
    return JOBS.map((j) => ({
      ...j,
      roleText: j.role[l],
      productText: j.product[l],
      periodText: j.period[l],
      points: j.points.map((p) => p[l]),
      datetime: j.from,
    }));
  });
  protected readonly shownJobs = computed(() =>
    this.showAllJobs() ? this.jobs() : this.jobs().slice(0, this.visibleJobsCount),
  );
  protected readonly hiddenJobsCount = computed(() => this.jobs().length - this.visibleJobsCount);

  constructor() {
    effect(() => {
      const l = this.lang();
      this.doc.documentElement.lang = l;
      write('pf-lang', l);
    });
    effect(() => {
      const th = this.theme();
      this.doc.documentElement.setAttribute('data-theme', th);
      write('pf-theme', th);
    });
    this.watchSections();
  }

  /** Scroll-spy: the section crossing the upper third of the viewport is "active". */
  private watchSections(): void {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') return;
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) this.active.set(e.target.id);
        },
        { rootMargin: '-35% 0px -60% 0px' },
      );
      for (const id of ['top', ...this.sections.map((s) => s.id)]) {
        const el = this.doc.getElementById(id);
        if (el) io.observe(el);
      }
      destroyRef.onDestroy(() => io.disconnect());
    });
  }

  protected setLang(v: string | null): void {
    if (v === 'uk' || v === 'en') this.lang.set(v);
  }

  protected setTheme(v: string | null): void {
    if (v !== 'auto' && v !== 'light' && v !== 'dark') return;
    const reduce = this.doc.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doc = this.doc as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !reduce) {
      doc.startViewTransition(() => {
        this.theme.set(v);
        this.doc.documentElement.setAttribute('data-theme', v);
      });
    } else {
      this.theme.set(v);
    }
  }

  /** "vadem-quiz.vercel.app" for the browser-frame address bar. */
  protected host(url: string): string {
    return new URL(url).host + new URL(url).pathname.replace(/\/$/, '');
  }

  protected tx<T extends Record<Lang, string>>(v: T): string {
    return v[this.lang()];
  }

  private detectLang(): Lang {
    return (this.doc.defaultView?.navigator.language ?? 'en').toLowerCase().startsWith('uk')
      ? 'uk'
      : 'en';
  }

  private initialTheme(): Theme {
    const saved = read('pf-theme');
    return saved === 'light' || saved === 'dark' || saved === 'auto' ? saved : 'dark';
  }
}
