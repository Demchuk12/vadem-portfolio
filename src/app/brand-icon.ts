import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { siGithub, siNpm, siTelegram } from 'simple-icons';

export type PfBrand = 'github' | 'linkedin' | 'telegram' | 'npm';

/**
 * LinkedIn is not in Simple Icons (removed at the company's request); this is its standard "in"
 * glyph, which LinkedIn allows for linking to a profile.
 */
const LINKEDIN = {
  hex: '0A66C2',
  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
};

const BRANDS: Record<PfBrand, { hex: string; path: string }> = {
  github: siGithub,
  linkedin: LINKEDIN,
  telegram: siTelegram,
  npm: siNpm,
};

/** Brand mark sized like `vd-icon` (1.25em, currentColor), so it drops into vdButton slots. */
@Component({
  selector: 'pf-brand-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'vd-icon pf-brand', '[attr.data-brand]': 'name()', 'aria-hidden': 'true' },
  template: `<svg class="vd-icon__svg" viewBox="0 0 24 24" fill="currentColor" focusable="false"><path [attr.d]="path()" /></svg>`,
})
export class PfBrandIcon {
  readonly name = input.required<PfBrand>();
  protected readonly path = computed(() => BRANDS[this.name()].path);
}

/** Which brand a link points to, for project/cert links built from data. */
export function brandOf(href: string): PfBrand | null {
  if (href.includes('github.com')) return 'github';
  if (href.includes('linkedin.com')) return 'linkedin';
  if (href.includes('t.me/')) return 'telegram';
  if (href.includes('npmjs.com')) return 'npm';
  return null;
}
