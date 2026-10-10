import { gsap } from 'gsap';

export function initMagnetic() {
  if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      gsap.to(el, { x: x * 0.16, y: y * 0.16, duration: 0.25, overwrite: true });
    });
    el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.5 }));
  });
}
