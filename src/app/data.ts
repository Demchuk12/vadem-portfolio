export type Lang = 'uk' | 'en';
export type L10n = Record<Lang, string>;

export interface Job {
  company: string;
  role: L10n;
  product: L10n;
  from: string; // ISO yyyy-mm
  to: string;
  period: L10n;
  stack: string[];
  points: L10n[];
  current?: boolean;
}

export interface Project {
  id: string;
  name: string;
  /** Screenshot of the live app in public/projects: `<id>.webp` (1280×800) and `<id>-640.webp`. */
  image: string;
  /** Optional phone screenshot: `<id>-mobile.webp` (780×1328) and `<id>-mobile-390.webp`. */
  mobile?: string;
  badge: L10n;
  tagline: L10n;
  /** One or two sentences: what it is and who it is for. */
  summary: L10n;
  /** Three key facts, shown as a checklist. */
  features: L10n[];
  stack: string[];
  links: { label: L10n; href: string; primary?: boolean }[];
}

export const PROFILE = {
  name: 'Vasyl Demchuk',
  email: 'vasyldemchuk1@gmail.com',
  telegram: 'https://t.me/inseyul',
  github: 'https://github.com/Demchuk12',
  linkedin: 'https://www.linkedin.com/in/vasyl-demchuk-152148255/',
  title: {
    uk: 'Frontend / Full Stack інженер',
    en: 'Frontend / Full Stack Engineer',
  } satisfies L10n,
};

export const JOBS: Job[] = [
  {
    company: 'Molochnyi Ostriv',
    role: { uk: 'Full Stack Engineer (контракт)', en: 'Full Stack Engineer (Contract)' },
    product: {
      uk: 'Автоматизація виробництва та моніторинг заводу',
      en: 'Factory process automation and plant monitoring',
    },
    from: '2026-07', to: '2026-11',
    period: { uk: 'лип 2026 – лист 2026', en: 'Jul 2026 – Nov 2026' },
    stack: ['.NET 10', 'Angular 22', 'PostgreSQL', 'TimescaleDB', 'Redis', 'SignalR'],
    current: true,
    points: [
      {
        uk: 'Спроєктував і створив систему автоматизації виробничих процесів та платформу моніторингу заводу в реальному часі на даних PLC-сенсорів, від початку до кінця.',
        en: 'Designed and built a factory process automation system and a real-time plant monitoring platform driven by PLC sensor data, end to end.',
      },
      {
        uk: 'Бекенд на .NET 10: PostgreSQL для операційних даних, TimescaleDB для часових рядів сенсорів, Redis для кешу.',
        en: 'Backend on .NET 10 with PostgreSQL for operational data, TimescaleDB for time-series sensor data, and Redis for caching.',
      },
      {
        uk: 'Доставка показників сенсорів і живих виробничих даних в UI через SignalR; фронтенд на Angular 22 з live-дашбордами.',
        en: 'Real-time delivery of sensor readings and live production data to the UI via SignalR; Angular 22 frontend with live dashboards.',
      },
    ],
  },
  {
    company: 'Binotel',
    role: { uk: 'Frontend Engineer', en: 'Frontend Engineer' },
    product: { uk: 'smartCRM', en: 'smartCRM' },
    from: '2025-12', to: '2026-05',
    period: { uk: 'гру 2025 – трав 2026', en: 'Dec 2025 – May 2026' },
    stack: ['Angular 20', 'NgRx 19', 'Signals', 'RxJS', 'Highcharts', 'Sentry'],
    points: [
      {
        uk: 'Багаторазові Angular 20 компоненти та складні реактивні форми для CRM-процесів.',
        en: 'Reusable Angular 20 components and complex reactive forms for data-driven CRM workflows.',
      },
      {
        uk: 'Покращив продуктивність рендерингу та потоків стану; Sentry для діагностики на проді.',
        en: 'Improved rendering and state-flow performance; used Sentry for production diagnostics.',
      },
      {
        uk: 'Впровадив робочі процеси з Claude та ділився практиками AI-розробки з командою.',
        en: 'Introduced Claude-assisted workflows and shared practical AI engineering techniques with the team.',
      },
    ],
  },
  {
    company: 'Polytech Software',
    role: { uk: 'Frontend Engineer', en: 'Frontend Engineer' },
    product: { uk: 'Інтерактивні спортивні продукти', en: 'Interactive sports products' },
    from: '2025-05', to: '2025-12',
    period: { uk: 'трав 2025 – гру 2025', en: 'May 2025 – Dec 2025' },
    stack: ['Angular 19', 'NGXS', 'RxJS', 'SCSS'],
    points: [
      {
        uk: 'Адаптивні mobile-first інтерфейси на Angular 19 з TypeScript, RxJS, NGXS.',
        en: 'Reusable, responsive Angular 19 interfaces and mobile-first product flows with RxJS and NGXS.',
      },
      {
        uk: 'Lazy loading та оптимізація реактивних потоків даних; CI/CD, архітектурні рішення, code review.',
        en: 'Lazy loading and optimized reactive data flows; CI/CD delivery, architecture decisions and code reviews.',
      },
    ],
  },
  {
    company: 'Concert.ua',
    role: { uk: 'Frontend Engineer', en: 'Frontend Engineer' },
    product: { uk: 'Квиткова платформа', en: 'Ticketing platform' },
    from: '2024-05', to: '2025-03',
    period: { uk: 'трав 2024 – бер 2025', en: 'May 2024 – Mar 2025' },
    stack: ['Angular 16', 'NgRx', 'RxJS', 'TypeScript'],
    points: [
      {
        uk: 'Складні таблиці, багатокрокові форми й продуктові флоу, інтегровані з бекенд API.',
        en: 'Complex data tables, multi-step forms and product workflows integrated with backend APIs.',
      },
      {
        uk: 'Рефакторинг спільної UI-архітектури й бібліотек: задокументоване покращення продуктивності та підтримуваності на 20%.',
        en: 'Refactored shared UI architecture and libraries, contributing to a documented 20% improvement in performance and maintainability.',
      },
    ],
  },
  {
    company: 'PrivatBank',
    role: { uk: 'Frontend Engineer', en: 'Frontend Engineer' },
    product: { uk: 'Банківські продукти', en: 'Banking products' },
    from: '2021-10', to: '2024-04',
    period: { uk: 'жов 2021 – квіт 2024', en: 'Oct 2021 – Apr 2024' },
    stack: ['Angular 15', 'Node.js', 'Express', 'React', 'Jenkins', 'Docker'],
    points: [
      {
        uk: 'Захищені адаптивні форми та інтерфейси з великими обсягами даних на Angular 15.',
        en: 'Secure, responsive forms and data-intensive interfaces with Angular 15.',
      },
      {
        uk: 'Задачі на Node.js/Express бекенді, React де потрібно; Jenkins, Docker, Postman, Swagger, юніт-тести на Karma та Jasmine.',
        en: 'Node.js/Express backend tasks, React where required; delivery via Jenkins and Docker, Postman and Swagger, Karma and Jasmine unit tests.',
      },
    ],
  },
  {
    company: 'AzSoft Rocks',
    role: { uk: 'Frontend Developer', en: 'Frontend Developer' },
    product: { uk: 'Веб-застосунки', en: 'Web applications' },
    from: '2020-09', to: '2021-09',
    period: { uk: 'вер 2020 – вер 2021', en: 'Sep 2020 – Sep 2021' },
    stack: ['Angular 12', 'NGXS', 'Cypress', 'Bootstrap'],
    points: [
      {
        uk: 'Багаторазові фічі на Angular 12, інтеграція REST API, автотести на Karma, Jasmine та Cypress.',
        en: 'Reusable Angular 12 features, REST API integration, regression safety with Karma, Jasmine and Cypress.',
      },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'vadem-ui',
    image: 'projects/vadem-ui.webp',
    name: 'Vadem UI',
    badge: { uk: 'Бібліотека · npm', en: 'Library · npm' },
    tagline: { uk: 'Власна Angular UI-бібліотека', en: 'My own Angular UI library' },
    summary: {
      uk: 'Моя Angular UI-бібліотека, опублікована в npm як @vadem/ui. На ній зроблено цей сайт і Vadem Quiz.',
      en: 'My Angular UI library, published on npm as @vadem/ui. This site and Vadem Quiz are built with it.',
    },
    features: [
      { uk: '70+ компонентів на signals і OnPush', en: '70+ components built on signals and OnPush' },
      { uk: 'Темна й світла теми на дизайн-токенах', en: 'Dark and light themes from design tokens' },
      { uk: 'Доступність за WAI-ARIA, клавіатура, локалі EN/UK', en: 'WAI-ARIA accessibility, keyboard support, EN/UK locales' },
    ],
    stack: ['Angular 22', 'TypeScript', 'CSS tokens', 'Playwright', 'npm'],
    links: [
      { label: { uk: 'Сайт і галерея', en: 'Site & gallery' }, href: 'https://demchuk12.github.io/vadem-ui-angular/gallery/', primary: true },
      { label: { uk: 'npm', en: 'npm' }, href: 'https://www.npmjs.com/package/@vadem/ui' },
      { label: { uk: 'GitHub', en: 'GitHub' }, href: 'https://github.com/Demchuk12/vadem-ui-angular' },
    ],
  },
  {
    id: 'vadem-quiz',
    image: 'projects/vadem-quiz.webp',
    mobile: 'projects/vadem-quiz-mobile.webp',
    name: 'Vadem Quiz',
    badge: { uk: 'AI · Realtime · PWA', en: 'AI · Realtime · PWA' },
    tagline: { uk: 'Живий квіз для друзів з AI-генерацією', en: 'Live quiz board game with AI generation' },
    summary: {
      uk: 'Квіз-гра для компанії друзів: ведучий запускає питання, гравці тиснуть кнопку з телефонів, а табло йде в Discord-стрім.',
      en: 'A quiz board game for friends: the host opens a question, players buzz in from their phones, and the board goes to a Discord stream.',
    },
    features: [
      { uk: 'AI пише раунди за темою, редагує питання й підбирає фото з Wikipedia', en: 'AI writes rounds from a topic, edits questions and picks photos from Wikipedia' },
      { uk: 'Gemini безкоштовно або свій ключ: ChatGPT, Claude, Groq, Mistral, OpenRouter', en: 'Gemini for free or your own key: ChatGPT, Claude, Groq, Mistral, OpenRouter' },
      { uk: 'Кнопка «хто перший» у реальному часі на Supabase Realtime', en: 'First-press-wins buzzer in real time on Supabase Realtime' },
    ],
    stack: ['Angular 22', '@vadem/ui', 'Supabase', 'Edge Functions', 'LLM APIs', 'Realtime', 'PWA'],
    links: [
      { label: { uk: 'Відкрити', en: 'Open app' }, href: 'https://vadem-quiz.vercel.app', primary: true },
      { label: { uk: 'GitHub', en: 'GitHub' }, href: 'https://github.com/Demchuk12/vadem-quiz' },
    ],
  },
  {
    id: 'tourist-report',
    image: 'projects/tourist-report.webp',
    mobile: 'projects/tourist-report-mobile.webp',
    name: 'Tourist Report',
    badge: { uk: 'SvelteKit · PWA', en: 'SvelteKit · PWA' },
    tagline: { uk: 'Звітність для керівників туристичних груп', en: 'Reporting for tour group leaders' },
    summary: {
      uk: 'Робочий інструмент для керівників туристичних груп: тури, туристи й екскурсії, готові до звітності.',
      en: 'A working tool for tour group leaders: tours, tourists and excursions, ready for reporting.',
    },
    features: [
      { uk: 'Календар турів і глобальний пошук (Ctrl+K)', en: 'Tour calendar and global search (Ctrl+K)' },
      { uk: 'Розрахунок по туру і друкований звіт у PDF', en: 'Per-tour totals and a printable PDF report' },
      { uk: 'Працює офлайн: IndexedDB і PWA, локалізація UA/EN', en: 'Works offline: IndexedDB and PWA, UA/EN localization' },
    ],
    stack: ['SvelteKit 5', 'TypeScript', 'IndexedDB', 'Paraglide', 'PWA'],
    links: [
      { label: { uk: 'Відкрити', en: 'Open app' }, href: 'https://tourist-report.vercel.app', primary: true },
      { label: { uk: 'GitHub', en: 'GitHub' }, href: 'https://github.com/Demchuk12/tourist-report' },
    ],
  },
];

export const COPY = {
  uk: {
    navLabel: 'Розділи сторінки',
    nav: { about: 'Про мене', stack: 'Стек', experience: 'Досвід', projects: 'Проєкти', contact: 'Контакти' },
    hero: {
      eyebrow: 'Відкритий до пропозицій',
      facts: ['Middle+', 'Україна · Remote · UTC+2', 'English: Intermediate+', 'Магістр, кібербезпека'],
      lead: 'Понад 5 років будую складні вебзастосунки: від CRM і банкінгу до моніторингу заводу в реальному часі. Сильна база в Angular і TypeScript, а останнім часом ще й .NET, PostgreSQL та SignalR.',
      cta: 'Написати мені',
      cv: 'Мої проєкти',
    },
    stats: [
      { label: 'Років досвіду', value: '5+', caption: 'комерційна розробка' },
      { label: 'Компаній', value: '6', caption: 'банк, CRM, квитки, спорт, завод' },
      { label: 'Версії Angular', value: '12–22', caption: 'у продакшені' },
    ],
    stackTitle: 'Технологічний стек',
    stackLead: 'Те, з чим працюю щодня, і те, з чим впевнено працюю за потреби.',
    expTitle: 'Досвід',
    expLead: 'Від новіших до старіших позицій.',
    expLabel: 'Історія роботи',
    now: 'Зараз',
    showMore: (n: number) => `Показати ще ${n} ${n === 1 ? 'позицію' : n < 5 ? 'позиції' : 'позицій'}`,
    showLess: 'Згорнути',
    projTitle: 'Пет-проєкти',
    projLead: 'Те, що я будую для себе й друзів.',
    shotAlt: (name: string) => `Скріншот ${name}`,
    eduTitle: 'Освіта і мови',
    edu: 'Тернопільський національний технічний університет імені Івана Пулюя',
    degrees: ['Магістр, Кібербезпека', 'Бакалавр, Інформатика', 'Молодший спеціаліст, Інформатика'],
    langsTitle: 'Мови',
    langs: [
      { name: 'Українська', level: 'Вільно' },
      { name: 'English', level: 'Intermediate+' },
    ],
    contactTitle: 'Давайте працювати разом',
    copyEmail: 'Скопіювати email',
    copied: 'Скопійовано',
    copying: 'Копіюю…',
    copyError: 'Спробуйте ще',
    copyErrorMsg: 'Не вдалося скопіювати. Виділіть адресу й скопіюйте вручну.',
    contactLead: 'Розглядаю full-time, контракт / B2B (ФОП) і part-time. Пишіть на пошту або в Telegram.',
    builtWith: 'Зроблено на Angular 22 і @vadem/ui',
    theme: 'Тема',
    themes: { auto: 'Авто', light: 'Світла', dark: 'Темна' },
    lang: 'Мова',
    skip: 'Перейти до змісту',
  },
  en: {
    navLabel: 'Page sections',
    nav: { about: 'About', stack: 'Stack', experience: 'Experience', projects: 'Projects', contact: 'Contact' },
    hero: {
      eyebrow: 'Open to work',
      facts: ['Middle+', 'Ukraine · Remote · UTC+2', 'English: Intermediate+', "Master's, Cyber Security"],
      lead: 'For 5+ years I have been building complex web applications, from CRM and banking to real-time factory monitoring. A strong Angular and TypeScript foundation, recently extended with .NET, PostgreSQL and SignalR.',
      cta: 'Get in touch',
      cv: 'See my projects',
    },
    stats: [
      { label: 'Years of experience', value: '5+', caption: 'commercial development' },
      { label: 'Companies', value: '6', caption: 'banking, CRM, ticketing, sports, industrial' },
      { label: 'Angular versions', value: '12–22', caption: 'in production' },
    ],
    stackTitle: 'Tech stack',
    stackLead: 'What I work with every day, and what I am comfortable with when needed.',
    expTitle: 'Experience',
    expLead: 'Most recent first.',
    expLabel: 'Work history',
    now: 'Current',
    showMore: (n: number) => `Show ${n} more ${n === 1 ? 'role' : 'roles'}`,
    showLess: 'Show less',
    projTitle: 'Side projects',
    projLead: 'Things I build for myself and friends.',
    shotAlt: (name: string) => `${name} screenshot`,
    eduTitle: 'Education & languages',
    edu: 'Ternopil Ivan Puluj National Technical University',
    degrees: ["Master's, Cyber Security", "Bachelor's, Computer Science", 'Junior Specialist, Computer Science'],
    langsTitle: 'Languages',
    langs: [
      { name: 'Ukrainian', level: 'Fluent' },
      { name: 'English', level: 'Intermediate+' },
    ],
    contactTitle: "Let's work together",
    copyEmail: 'Copy email',
    copied: 'Copied',
    copying: 'Copying…',
    copyError: 'Try again',
    copyErrorMsg: 'Could not copy. Select the address and copy it manually.',
    contactLead: 'Open to full-time, contract / B2B and part-time roles. Reach me by email or Telegram.',
    builtWith: 'Built with Angular 22 and @vadem/ui',
    theme: 'Theme',
    themes: { auto: 'Auto', light: 'Light', dark: 'Dark' },
    lang: 'Language',
    skip: 'Skip to content',
  },
} as const;
