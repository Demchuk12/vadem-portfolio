import type { VdIconName } from '@vadem/ui/icon';
import {
  type SimpleIcon,
  siAngular, siClaude, siCss, siCypress, siDocker, siDotnet, siExpress, siGit, siGooglegemini,
  siHtml5, siIonic, siJasmine, siJavascript, siJenkins, siMaterialdesign, siNgrx, siNodedotjs,
  siPostgresql, siPostman, siReact, siReactivex, siRedis, siSass, siSentry, siSupabase, siSvelte,
  siSwagger, siTailwindcss, siTimescale, siTypescript, siVuedotjs,
} from 'simple-icons';
import type { L10n } from './data';

/** One tile: a brand logo (Simple Icons, CC0), a Vadem/Lucide icon, or a monogram when no logo exists. */
export interface Tech {
  name: string;
  logo?: SimpleIcon;
  icon?: VdIconName;
  mono?: string;
  /** Headline stack from the CV title. */
  core?: boolean;
}

export interface TechGroup {
  id: string;
  label: L10n;
  hint: L10n;
  icon: VdIconName;
  items: Tech[];
}

export const TECH_GROUPS: TechGroup[] = [
  {
    id: 'frontend',
    label: { uk: 'Frontend', en: 'Frontend' },
    hint: { uk: 'Angular 12–22 у продакшені з 2020 року', en: 'Angular 12–22 in production since 2020' },
    icon: 'monitor',
    items: [
      { name: 'Angular', logo: siAngular, core: true },
      { name: 'TypeScript', logo: siTypescript, core: true },
      { name: 'RxJS', logo: siReactivex },
      { name: 'Signals', icon: 'activity' },
      { name: 'NgRx', logo: siNgrx },
      { name: 'NGXS', mono: 'NX' },
      { name: 'JavaScript', logo: siJavascript },
      { name: 'Vue.js', logo: siVuedotjs },
      { name: 'Svelte', logo: siSvelte },
      { name: 'React', logo: siReact },
      { name: 'Angular Material', logo: siMaterialdesign },
      { name: 'Highcharts', mono: 'Hc' },
      { name: 'Ionic', logo: siIonic },
      { name: 'Tailwind CSS', logo: siTailwindcss },
      { name: 'SCSS', logo: siSass },
      { name: 'HTML5', logo: siHtml5 },
      { name: 'CSS', logo: siCss },
    ],
  },
  {
    id: 'backend',
    label: { uk: 'Backend і дані', en: 'Backend & data' },
    hint: { uk: 'Real-time потоки і часові ряди', en: 'Real-time streams and time series' },
    icon: 'activity',
    items: [
      { name: '.NET 10', logo: siDotnet, core: true },
      { name: 'C#', mono: 'C#' },
      { name: 'SignalR', mono: 'SR', core: true },
      { name: 'PostgreSQL', logo: siPostgresql, core: true },
      { name: 'TimescaleDB', logo: siTimescale },
      { name: 'Redis', logo: siRedis },
      { name: 'Node.js', logo: siNodedotjs },
      { name: 'Express', logo: siExpress },
      { name: 'Supabase', logo: siSupabase },
      { name: 'REST APIs', icon: 'globe' },
    ],
  },
  {
    id: 'arch',
    label: { uk: 'Архітектура', en: 'Architecture' },
    hint: { uk: 'Як я будую системи', en: 'How I build systems' },
    icon: 'layout-dashboard',
    items: [
      { name: 'Real-time pipelines', icon: 'activity' },
      { name: 'IoT / PLC data', icon: 'monitor' },
      { name: 'Component systems', icon: 'layout-dashboard' },
      { name: 'State management', icon: 'git-branch' },
      { name: 'Performance', icon: 'rocket' },
      { name: 'Design systems', icon: 'star' },
    ],
  },
  {
    id: 'tools',
    label: { uk: 'Інструменти й тести', en: 'Tools & testing' },
    hint: { uk: 'Доставка й якість', en: 'Delivery and quality' },
    icon: 'settings',
    items: [
      { name: 'Git', logo: siGit },
      { name: 'Docker', logo: siDocker },
      { name: 'Jenkins', logo: siJenkins },
      { name: 'Postman', logo: siPostman },
      { name: 'Swagger', logo: siSwagger },
      { name: 'Sentry', logo: siSentry },
      { name: 'Jasmine', logo: siJasmine },
      { name: 'Karma', mono: 'K' },
      { name: 'Cypress', logo: siCypress },
    ],
  },
  {
    id: 'ai',
    label: { uk: 'AI у розробці', en: 'AI-assisted' },
    hint: { uk: 'У щоденній роботі та в продуктах', en: 'In daily work and in products' },
    icon: 'star',
    items: [
      { name: 'Claude', logo: siClaude },
      { name: 'Codex', mono: 'Cx' },
      { name: 'Gemini API', logo: siGooglegemini },
      { name: 'Refactoring', icon: 'pencil' },
      { name: 'Debugging', icon: 'search' },
      { name: 'Automation', icon: 'settings' },
    ],
  },
];

/** Relative luminance of a #rrggbb brand color (WCAG formula). */
export function luminance(hex: string): number {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
