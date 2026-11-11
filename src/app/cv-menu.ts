import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { VdButton } from '@vadem/ui/button';
import { VdIcon } from '@vadem/ui/icon';
import { VdMenu, VdMenuItem, VdMenuLabel, VdMenuTrigger } from '@vadem/ui/menu';
import type { Lang } from './data';

const CVS = [
  { id: 'frontend', role: 'Frontend Engineer', file: 'Vasyl_Demchuk_Frontend_Engineer_CV.pdf' },
  { id: 'fullstack', role: 'Full Stack Engineer', file: 'Vasyl_Demchuk_Full_Stack_Engineer_CV.pdf' },
] as const;

const TEXT = {
  uk: { button: 'Завантажити CV', short: 'CV', label: 'Версія CV' },
  en: { button: 'Download CV', short: 'CV', label: 'CV version' },
} as const;

/** One CV trigger, two PDFs: the recruiter picks the version that matches the vacancy. */
@Component({
  selector: 'pf-cv-menu',
  imports: [VdButton, VdIcon, VdMenu, VdMenuItem, VdMenuLabel, VdMenuTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (appearance() === 'tab') {
      <button type="button" class="tabbar__item" [vdMenuTrigger]="menu">
        <vd-icon name="download" />
        <span>{{ t().short }}</span>
      </button>
    } @else {
      <button vdButton [size]="size()" [vdMenuTrigger]="menu">
        <vd-icon slot="start" name="download" />{{ t().button }}<vd-icon slot="end" name="chevron-down" />
      </button>
    }
    <div vdMenu #menu="vdMenu">
      <div vdMenuLabel>{{ t().label }}</div>
      @for (cv of cvs; track cv.id) {
        <a vdMenuItem [href]="cv.file" download>
          <vd-icon name="file" />{{ cv.role }}<span slot="end">PDF</span>
        </a>
      }
    </div>
  `,
  styles: `:host { display: contents; }`,
})
export class PfCvMenu {
  readonly lang = input<Lang>('uk');
  readonly size = input<'sm' | 'md' | 'lg'>('lg');
  readonly appearance = input<'button' | 'tab'>('button');
  protected readonly t = computed(() => TEXT[this.lang()]);
  protected readonly cvs = CVS;
}
