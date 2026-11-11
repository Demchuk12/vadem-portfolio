import type { Routes } from '@angular/router';

/**
 * One page in two languages. The routes carry no components: App reads the language from the URL,
 * and each path is prerendered to its own HTML (`/` English, `/uk` Ukrainian).
 */
export const routes: Routes = [
  { path: '', pathMatch: 'full', children: [] },
  { path: 'uk', children: [] },
  { path: '**', redirectTo: '' },
];
