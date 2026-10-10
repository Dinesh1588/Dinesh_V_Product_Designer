import './styles/reset.css';
import './styles/tokens.css';
import './styles/typography.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/animations.css';
import './styles/responsive.css';
import { initTheme } from './components/theme';
import { initNavigation } from './components/navigation';
import { initCursor } from './components/cursor';
import { initMagnetic } from './components/magnetic';
import { initMotion } from './animations/gsap';
import { createHeroScene } from './three/heroScene';

initTheme();
initNavigation();
initCursor();
initMagnetic();
initMotion();

const hero = document.querySelector<HTMLElement>('#threeHero');
if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) createHeroScene(hero);

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (event) => {
    const target = document.querySelector(a.getAttribute('href') || '');
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

import { optionalAnimationAssets } from './animations/optionalAssets';
void optionalAnimationAssets;


// Floating back-to-top control: appears after the visitor moves down the page.
const backToTop = document.querySelector<HTMLButtonElement>('#backToTop');
if (backToTop) {
  const updateBackToTop = () => backToTop.classList.toggle('is-visible', window.scrollY > 520);
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
}


// Keep recognizable labels visible if a third-party brand logo CDN is unavailable.
document.querySelectorAll<HTMLAnchorElement>('.tool-logo[data-mark] img').forEach((img) => {
  const parent = img.closest<HTMLAnchorElement>('.tool-logo');
  const mark = () => parent?.classList.add('icon-fallback');
  img.addEventListener('error', mark, { once: true });
  if (img.complete && img.naturalWidth === 0) mark();
});


// Minimal ambient orange embers, intentionally sparse and disabled for reduced-motion users.
const emberField = document.querySelector<HTMLElement>('#emberField');
if (emberField && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  for (let i = 0; i < 18; i += 1) {
    const ember = document.createElement('span');
    ember.className = 'ember';
    ember.style.left = `${(i * 37 + 11) % 100}%`;
    ember.style.top = `${70 + ((i * 19) % 45)}%`;
    ember.style.setProperty('--duration', `${10 + (i % 7) * 1.7}s`);
    ember.style.setProperty('--delay', `${-(i % 11) * 1.4}s`);
    ember.style.setProperty('--drift', `${(i % 2 ? 1 : -1) * (12 + (i % 5) * 9)}px`);
    emberField.appendChild(ember);
  }
}
