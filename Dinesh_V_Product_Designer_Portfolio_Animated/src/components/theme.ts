export function initTheme() {
  const root = document.documentElement;
  const button = document.querySelector<HTMLButtonElement>('#themeToggle');
  const saved = localStorage.getItem('dinesh-theme');
  root.dataset.theme = saved === 'light' ? 'light' : 'dark';
  const update = () => {
    const light = root.dataset.theme === 'light';
    if (button) {
      button.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
      button.innerHTML = light ? '<span>☾</span>' : '<span>☼</span>';
    }
  };
  update();
  button?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('dinesh-theme', root.dataset.theme);
    update();
  });
}
