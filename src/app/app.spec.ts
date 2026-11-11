import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  async function render() {
    await TestBed.configureTestingModule({ imports: [App], providers: [provideRouter(routes)] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the English page at /', async () => {
    const el = await render();
    expect(el.querySelector('.hero__role')?.textContent?.trim()).toBe('Frontend / Full Stack Engineer');
    expect(el.querySelector('h1')?.textContent).toContain('Vasyl Demchuk');
  });

  it('shows three roles until "show more" is pressed', async () => {
    const el = await render();
    expect(el.querySelectorAll('.vd-timeline-item')).toHaveLength(3);
    const more = el.querySelector<HTMLButtonElement>('.more button')!;
    expect(more.getAttribute('aria-expanded')).toBe('false');
    more.click();
    TestBed.tick();
    expect(el.querySelectorAll('.vd-timeline-item')).toHaveLength(6);
    expect(more.getAttribute('aria-expanded')).toBe('true');
  });

  it('offers both CVs and every contact channel', async () => {
    const el = await render();
    const hrefs = [...el.querySelectorAll('a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('Vasyl_Demchuk_Frontend_Engineer_CV.pdf');
    expect(hrefs).toContain('Vasyl_Demchuk_Full_Stack_Engineer_CV.pdf');
    expect(hrefs).toContain('mailto:vasyldemchuk1@gmail.com');
    expect(hrefs).toContain('https://t.me/inseyul');
  });
});
