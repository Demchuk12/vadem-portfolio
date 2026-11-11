import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'uk', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
