import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    document.documentElement.classList.add('reduced-motion');
    return;
  }

  gsap.fromTo('.hero-kicker', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15 });
  gsap.fromTo('.hero-title .word', { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.09, ease: 'power4.out', delay: 0.25 });
  gsap.fromTo('.hero-lead, .hero-actions, .hero-proof', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.7 });
  gsap.fromTo('.hero-visual', { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.3, ease: 'power3.out', delay: 0.35 });

  // Rotating hero value proposition: an accessible, animated phrase rotator.
  const phrase = document.querySelector<HTMLElement>('#rotatingPhrase');
  if (phrase) {
    const phrases = ['for the real world.', 'for real people.', 'for complex systems.', 'for products that scale.', 'for everyday impact.'];
    let index = 0;
    gsap.delayedCall(2.2, function rotatePhrase() {
      if (!phrase.isConnected) return;
      index = (index + 1) % phrases.length;
      gsap.to(phrase, { y: -12, opacity: 0, duration: 0.22, ease: 'power2.in', onComplete: () => {
        phrase.textContent = phrases[index];
        gsap.fromTo(phrase, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: 'power3.out' });
      }});
      gsap.delayedCall(3.1, rotatePhrase);
    });
  }

  // Subtle continuous movement on the two hero proof chips.
  gsap.to('.chip-top', { y: -8, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  gsap.to('.chip-bottom', { y: 7, duration: 3.1, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.35 });

  gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
    gsap.fromTo(el, { y: 45, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%', once: true }
    });
  });

  const processLine = document.querySelector<HTMLElement>('.process-line-fill');
  if (processLine) {
    gsap.fromTo(processLine, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center', ease: 'none', scrollTrigger: { trigger: '.process-track', start: 'top 65%', end: 'bottom 65%', scrub: true } });
  }

  gsap.utils.toArray<HTMLElement>('.project-card').forEach((card) => {
    const media = card.querySelector<HTMLElement>('.project-media');
    const image = card.querySelector<HTMLElement>('img');
    if (!media || !image) return;
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(media, { rotateY: x * 3, rotateX: -y * 3, duration: 0.35, overwrite: true });
      gsap.to(image, { x: x * 14, y: y * 10, scale: 1.055, duration: 0.45, overwrite: true });
    });
    card.addEventListener('pointerleave', () => {
      gsap.to(media, { rotateY: 0, rotateX: 0, duration: 0.5 });
      gsap.to(image, { x: 0, y: 0, scale: 1, duration: 0.6 });
    });
  });
}
