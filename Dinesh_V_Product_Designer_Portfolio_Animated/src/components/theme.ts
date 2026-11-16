import { playSound } from './sound';

export function initTheme() {
  const root = document.documentElement;
  const button = document.querySelector<HTMLButtonElement>('#themeToggle');
  root.dataset.theme = localStorage.getItem('dinesh-theme') === 'light' ? 'light' : 'dark';
  const update = () => {
    const light = root.dataset.theme === 'light';
    if (button) {
      button.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
      button.title = light ? 'Switch to dark mode' : 'Switch to light mode';
      button.innerHTML = light
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>';
    }
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
    playSound('theme', next === 'light' ? 'up' : 'down');
    update();
  });
}
