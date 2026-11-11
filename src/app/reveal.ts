import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/** One shared observer: elements fade/slide in the first time they enter the viewport. */
let observer: IntersectionObserver | undefined;

function sharedObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          observer?.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  return observer;
}

@Directive({
  selector: '[pfReveal]',
  host: { class: 'reveal', '[style.--reveal-delay]': "delay() + 'ms'" },
})
export class PfReveal {
  /** Stagger offset in ms, for items in a list. */
  readonly delay = input(0, { alias: 'pfReveal', transform: (v: unknown) => Number(v) || 0 });

  constructor() {
    const el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        el.classList.add('is-visible');
        return;
      }
      sharedObserver().observe(el);
    });
    inject(DestroyRef).onDestroy(() => observer?.unobserve(el));
  }
}
