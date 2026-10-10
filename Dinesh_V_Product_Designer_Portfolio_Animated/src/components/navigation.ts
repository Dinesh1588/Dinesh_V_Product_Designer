export function initNavigation() {
  const menu = document.querySelector<HTMLButtonElement>('#menuToggle');
  const nav = document.querySelector<HTMLElement>('#mobileNav');
  menu?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open') ?? false;
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => nav.classList.remove('open')));
}
