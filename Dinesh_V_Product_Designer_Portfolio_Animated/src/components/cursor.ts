import { gsap } from 'gsap';

export function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cursor = document.querySelector<HTMLElement>('.cursor');
  if (!cursor) return;
  const label = cursor.querySelector<HTMLElement>('.cursor-label');
  let x = window.innerWidth / 2, y = window.innerHeight / 2;
  let tx = x, ty = y;
  window.addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; });
  const tick = () => {
    x += (tx - x) * 0.18; y += (ty - y) * 0.18;
    gsap.set(cursor, { x, y });
    requestAnimationFrame(tick);
  };
  tick();

  document.querySelectorAll<HTMLElement>('[data-cursor]').forEach((el) => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('is-active'); if (label) label.textContent = el.dataset.cursor || ''; });
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
  });
}
