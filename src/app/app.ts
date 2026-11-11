import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { VdBadge } from '@vadem/ui/badge';
import { VdButton } from '@vadem/ui/button';
import {
  VdCard,
  VdCardDescription,
  VdCardFooter,
  VdCardHeader,
  VdCardTitle,
} from '@vadem/ui/card';
import { VdIcon } from '@vadem/ui/icon';
import { VdSegment, VdSegmented } from '@vadem/ui/segmented';
import { VdStat } from '@vadem/ui/stat';
import { VdTab, VdTabList, VdTabPanel, VdTabs } from '@vadem/ui/tabs';
import {
  VdTimeline,
  VdTimelineItem,
  VdTimelineTime,
  VdTimelineTitle,
} from '@vadem/ui/timeline';
import { PfReveal } from './reveal';
import { COPY, JOBS, type Lang, PROFILE, PROJECTS, STACK_GROUPS } from './data';

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
    PfReveal,
    VdBadge,
    VdButton,
    VdCard,
    VdCardDescription,
    VdCardFooter,
    VdCardHeader,
    VdCardTitle,
    VdIcon,
    VdSegment,
    VdSegmented,
    VdStat,
    VdTab,
    VdTabList,
    VdTabPanel,
    VdTabs,
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
  protected readonly groups = STACK_GROUPS;
  protected readonly projects = PROJECTS;
  protected readonly year = new Date().getFullYear();

  protected readonly lang = signal<Lang>(
    read('pf-lang') === 'en' ? 'en' : read('pf-lang') === 'uk' ? 'uk' : this.detectLang(),
  );
  protected readonly theme = signal<Theme>(this.initialTheme());
  protected readonly stackTab = signal<string>('frontend');

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
