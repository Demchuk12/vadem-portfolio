import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { COPY, JOBS, PROJECTS } from './data';

const publicFile = (p: string) => resolve(process.cwd(), 'public', p);

describe('content data', () => {
  it('has the same copy keys in both languages', () => {
    expect(Object.keys(COPY.en).sort()).toEqual(Object.keys(COPY.uk).sort());
  });

  it('gives every job text in both languages, newest first', () => {
    for (const job of JOBS) {
      for (const l10n of [job.role, job.product, job.period, ...job.points]) {
        expect(l10n.uk.trim()).not.toBe('');
        expect(l10n.en.trim()).not.toBe('');
      }
    }
    const starts = JOBS.map((j) => j.from);
    expect([...starts].sort().reverse()).toEqual(starts);
  });

  it('gives every project three features, https links and existing screenshots', () => {
    for (const p of PROJECTS) {
      expect(p.features).toHaveLength(3);
      expect(p.links.every((l) => l.href.startsWith('https://'))).toBe(true);
      expect(p.links.filter((l) => l.primary)).toHaveLength(1);
      expect(existsSync(publicFile(p.image))).toBe(true);
      expect(existsSync(publicFile(p.image.replace('.webp', '-640.webp')))).toBe(true);
      if (p.mobile) expect(existsSync(publicFile(p.mobile.replace('.webp', '-390.webp')))).toBe(true);
    }
  });

  it('ships both CV files', () => {
    expect(existsSync(publicFile('Vasyl_Demchuk_Frontend_Engineer_CV.pdf'))).toBe(true);
    expect(existsSync(publicFile('Vasyl_Demchuk_Full_Stack_Engineer_CV.pdf'))).toBe(true);
  });
});
