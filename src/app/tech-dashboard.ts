import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { VdBadge } from '@vadem/ui/badge';
import { VdCard } from '@vadem/ui/card';
import { VdIcon } from '@vadem/ui/icon';
import type { Lang } from './data';
import { PfReveal } from './reveal';
import { TECH_GROUPS, luminance } from './stack';

const TEXT = {
  uk: { core: 'Основний стек' },
  en: { core: 'Core stack' },
} as const;

@Component({
  selector: 'pf-tech-dashboard',
  imports: [PfReveal, VdBadge, VdCard, VdIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tech-dashboard.html',
  styleUrl: './tech-dashboard.css',
})
export class PfTechDashboard {
  readonly lang = input<Lang>('uk');
  protected readonly t = computed(() => TEXT[this.lang()]);

  protected readonly groups = TECH_GROUPS.map((g) => ({
    ...g,
    items: g.items.map((it) => ({
      ...it,
      // Near-black brand colors (Angular, Express) disappear on dark surfaces: use the text color.
      brand: it.logo && luminance(it.logo.hex) > 0.05 ? `#${it.logo.hex}` : null,
    })),
  }));
  protected readonly core = TECH_GROUPS.flatMap((g) => g.items.filter((i) => i.core));
}
