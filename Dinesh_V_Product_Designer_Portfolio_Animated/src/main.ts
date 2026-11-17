import './styles/reset.css';
import './styles/tokens.css';
import './styles/typography.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/animations.css';
import './styles/responsive.css';
import './styles/macos.css';
import { initTheme } from './components/theme';
import { initSound } from './components/sound';
import { initNavigation } from './components/navigation';

initSound();
initTheme();
initNavigation();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal sections only as they approach the viewport; no per-frame animation loop.
const revealItems = document.querySelectorAll<HTMLElement>('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Keep the headline phrase changing without a heavyweight animation library.
const phrase = document.querySelector<HTMLElement>('#rotatingPhrase');
if (phrase && !reduceMotion) {
  const phrases = ['for the real world.', 'for real people.', 'for complex systems.', 'for products that scale.', 'for everyday impact.'];
  let index = 0;
  window.setInterval(() => {
    if (document.hidden) return;
    phrase.classList.add('phrase-out');
    window.setTimeout(() => {
      index = (index + 1) % phrases.length;
      phrase.textContent = phrases[index];
      phrase.classList.remove('phrase-out');
    }, 180);
  }, 4200);
}

// Animate the process line only when the process section is visible.
const processLine = document.querySelector<HTMLElement>('.process-line-fill');
const processTrack = document.querySelector<HTMLElement>('.process-track');
if (processLine && processTrack && 'IntersectionObserver' in window && !reduceMotion) {
  const processObserver = new IntersectionObserver(([entry], observer) => {
    if (!entry.isIntersecting) return;
    processLine.classList.add('is-filled');
    observer.disconnect();
  }, { threshold: 0.25 });
  processObserver.observe(processTrack);
}

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });
});

const pageProgress = document.querySelector<HTMLElement>('#pageProgress');
const backToTop = document.querySelector<HTMLButtonElement>('#backToTop');
let scrollQueued = false;
const updateScrollUI = () => {
  if (scrollQueued) return;
  scrollQueued = true;
  window.requestAnimationFrame(() => {
    scrollQueued = false;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (pageProgress) pageProgress.style.transform = `scaleX(${maxScroll > 0 ? window.scrollY / maxScroll : 0})`;
    if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 520);
  });
};
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

// Keep tool labels visible when an external logo host is unavailable.
document.querySelectorAll<HTMLImageElement>('.tool-logo[data-mark] img').forEach((img) => {
  const parent = img.closest<HTMLAnchorElement>('.tool-logo');
  const mark = () => parent?.classList.add('icon-fallback');
  img.addEventListener('error', mark, { once: true });
  if (img.complete && img.naturalWidth === 0) mark();
});
