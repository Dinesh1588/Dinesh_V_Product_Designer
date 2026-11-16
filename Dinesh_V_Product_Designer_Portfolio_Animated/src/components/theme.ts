import { playSound } from './sound';

export function initTheme() {
  const root = document.documentElement;
  const button = document.querySelector<HTMLButtonElement>('#themeToggle');
  root.dataset.theme = localStorage.getItem('dinesh-theme') === 'light' ? 'light' : 'dark';

  const update = () => {
    const light = root.dataset.theme === 'light';
    if (!button) return;
    button.classList.toggle('is-on', light);
    button.setAttribute('aria-pressed', String(light));
    button.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    button.title = light ? 'Light theme is on — switch to dark' : 'Dark theme is on — switch to light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#f7f6f2' : '#0b0b0d');
  };

  update();
  button?.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    localStorage.setItem('dinesh-theme', next);
    document.body.classList.remove('theme-shift');
    void document.body.offsetWidth;
    document.body.classList.add('theme-shift');
    window.setTimeout(() => document.body.classList.remove('theme-shift'), 520);
    playSound('theme');
    update();
  });
}
