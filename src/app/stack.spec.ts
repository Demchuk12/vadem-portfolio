import { brandOf } from './brand-icon';
import { TECH_GROUPS, luminance } from './stack';

describe('tech stack', () => {
  it('gives every tile exactly one visual: logo, icon or monogram', () => {
    for (const item of TECH_GROUPS.flatMap((g) => g.items)) {
      const visuals = [item.logo, item.icon, item.mono].filter(Boolean);
      expect(visuals, item.name).toHaveLength(1);
    }
  });

  it('marks the CV headline stack as core', () => {
    const core = TECH_GROUPS.flatMap((g) => g.items.filter((i) => i.core).map((i) => i.name));
    expect(core).toEqual(['Angular', 'TypeScript', '.NET 10', 'SignalR', 'PostgreSQL']);
  });

  it('computes WCAG relative luminance', () => {
    expect(luminance('000000')).toBe(0);
    expect(luminance('FFFFFF')).toBeCloseTo(1);
    expect(luminance('0F0F11')).toBeLessThan(0.05); // Angular's mark falls back to text color
  });
});

describe('brandOf', () => {
  it('recognizes the linked services', () => {
    expect(brandOf('https://github.com/Demchuk12/vadem-quiz')).toBe('github');
    expect(brandOf('https://www.linkedin.com/in/x/')).toBe('linkedin');
    expect(brandOf('https://t.me/inseyul')).toBe('telegram');
    expect(brandOf('https://www.npmjs.com/package/@vadem/ui')).toBe('npm');
    expect(brandOf('https://vadem-quiz.vercel.app')).toBeNull();
  });
});
