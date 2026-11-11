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
  viewChild,
} from '@angular/core';
import { VdBadge } from '@vadem/ui/badge';
import { VdButton } from '@vadem/ui/button';
import { VdIcon } from '@vadem/ui/icon';
import { type SimpleIcon, siAnthropic, siHuggingface } from 'simple-icons';
import type { Lang } from './data';
import { PfReveal } from './reveal';
import { luminance } from './stack';

interface Cert {
  title: string;
  /** Course series shown as an eyebrow above the title. */
  series?: string;
  issuer: string;
  logo: SimpleIcon;
  /** ISO month for <time>. */
  issued: string;
  credentialId: string;
  skills: string[];
}

/** From the LinkedIn "Licenses & certifications" section (Sep 2026). */
const CERTS: Cert[] = [
  {
    title: 'AI Agents Fundamentals', issuer: 'Hugging Face', logo: siHuggingface,
    issued: '2026-09', credentialId: 'demchuk', skills: ['AI', 'LLM'],
  },
  {
    series: 'Claude Academy', title: 'Model Context Protocol: Advanced topics', issuer: 'Anthropic', logo: siAnthropic,
    issued: '2026-09', credentialId: '0618635b28281d3a041ffb7fa009c7dc', skills: ['Claude MCP', 'AI'],
  },
  {
    series: 'Claude Academy', title: 'Introduction to Model Context Protocol', issuer: 'Anthropic', logo: siAnthropic,
    issued: '2026-09', credentialId: '9781822d36f545d2b8e61d5de4beca98', skills: ['Claude MCP', 'AI'],
  },
  {
    series: 'Claude Academy', title: 'Claude Code in action', issuer: 'Anthropic', logo: siAnthropic,
    issued: '2026-09', credentialId: '04c6828d815fa1892fdf7ff9d06f8af4', skills: ['Claude Code', 'AI'],
  },
  {
    series: 'Claude Academy', title: 'Claude 101', issuer: 'Anthropic', logo: siAnthropic,
    issued: '2026-09', credentialId: '760f73a1deec7f402bb68e00100f0e42', skills: ['Claude Code', 'AI'],
  },
];

const TEXT = {
  uk: { title: 'Сертифікати', lead: 'AI-агенти, MCP і Claude Code: курси Anthropic та Hugging Face.', prev: 'Попередні', next: 'Наступні',
        all: 'Усі на LinkedIn', id: 'ID', list: 'Сертифікати', month: 'вер 2026' },
  en: { title: 'Certifications', lead: 'AI agents, MCP and Claude Code: courses by Anthropic and Hugging Face.', prev: 'Previous', next: 'Next',
        all: 'All on LinkedIn', id: 'ID', list: 'Certifications', month: 'Sep 2026' },
} as const;

/**
 * Scroll-snap strip: every card stays reachable (swipe, arrows, Tab), nothing auto-advances.
 */
@Component({
  selector: 'pf-certs',
  imports: [PfReveal, VdBadge, VdButton, VdIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './certs.html',
  styleUrl: './certs.css',
})
export class PfCerts {
  readonly lang = input<Lang>('uk');
  readonly linkedin = input.required<string>();

  protected readonly t = computed(() => TEXT[this.lang()]);
  protected readonly certs = CERTS.map((c) => ({
    ...c,
    brand: `#${c.logo.hex}`,
    // Anthropic's near-black mark would vanish on dark surfaces; it takes the text color.
    fg: luminance(c.logo.hex) > 0.05 ? `#${c.logo.hex}` : null,
  }));
  protected readonly allUrl = computed(() => this.linkedin().replace(/\/$/, '') + '/details/certifications/');

  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  protected readonly atStart = signal(true);
  protected readonly atEnd = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const el = this.track().nativeElement;
      const sync = () => {
        this.atStart.set(el.scrollLeft <= 4);
        this.atEnd.set(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
      };
      sync();
      el.addEventListener('scroll', sync, { passive: true });
      const ro = new ResizeObserver(sync);
      ro.observe(el);
      destroyRef.onDestroy(() => { el.removeEventListener('scroll', sync); ro.disconnect(); });
    });
  }

  protected scroll(dir: 1 | -1): void {
    const el = this.track().nativeElement;
    const card = el.querySelector<HTMLElement>('.cert');
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    const reduce = el.ownerDocument.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? 'auto' : 'smooth' });
  }
}
