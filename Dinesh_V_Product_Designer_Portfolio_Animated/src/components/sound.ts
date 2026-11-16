type SoundName = 'hover' | 'click' | 'navigate' | 'project' | 'theme';
let enabled = false;
let audio: AudioContext | null = null;
let hoverAt = 0;
function getAudio(): AudioContext | null {
  const Ctor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  audio ??= new Ctor();
  if (audio.state === 'suspended') void audio.resume();
  return audio;
}
function note(ctx: AudioContext, hz: number, duration: number, delay = 0, wave: OscillatorType = 'sine', volume = .02, to?: number) {
  const start = ctx.currentTime + delay, osc = ctx.createOscillator(), gain = ctx.createGain();
  osc.type = wave; osc.frequency.setValueAtTime(hz, start);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, start + duration);
  gain.gain.setValueAtTime(.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + .012);
  gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
  osc.connect(gain); gain.connect(ctx.destination); osc.start(start); osc.stop(start + duration + .02);
}
function play(kind: SoundName) {
  if (!enabled) return;
  const ctx = getAudio(); if (!ctx) return;
  if (kind === 'hover') note(ctx, 720, .035, 0, 'sine', .009, 880);
  if (kind === 'click') { note(ctx, 510, .055, 0, 'triangle', .02, 390); note(ctx, 760, .07, .025, 'sine', .012, 620); }
  if (kind === 'navigate') { note(ctx, 440, .09, 0, 'sine', .018, 660); note(ctx, 660, .12, .07, 'sine', .012, 880); }
  if (kind === 'project') [440, 554, 659, 880].forEach((n,i)=>note(ctx,n,.14,i*.045,'sine',.014));
  if (kind === 'theme') [523.25,659.25,783.99].forEach((n,i)=>note(ctx,n,.2,i*.065,'sine',.022));
}
export function playSound(kind: SoundName) { play(kind); }
export function initSound() {
  const button = document.querySelector<HTMLButtonElement>('#soundToggle');
  if (!button) return;
  enabled = localStorage.getItem('dinesh-sound') === 'on';
  const render = () => {
    button.setAttribute('aria-pressed', String(enabled));
    button.setAttribute('aria-label', enabled ? 'Turn sound effects off' : 'Turn sound effects on');
    button.title = enabled ? 'Sound effects on' : 'Sound effects off';
    button.classList.toggle('is-on', enabled);
    const label = button.querySelector<HTMLElement>('.sound-label');
    if (label) label.textContent = enabled ? 'SOUND ON' : 'SOUND OFF';
  };
  render();
  button.addEventListener('click', () => {
    enabled = !enabled; localStorage.setItem('dinesh-sound', enabled ? 'on' : 'off');
    if (enabled) { const ctx=getAudio(); if(ctx){note(ctx,587.33,.12);note(ctx,880,.16,.07,'sine',.02);} }
    render();
  });
  document.addEventListener('pointerover', event => {
    if (!(event.target instanceof Element)) return;
    const item=event.target.closest('a,button,summary');
    if (!item || item===button) return;
    const now=performance.now(); if(now-hoverAt<110) return; hoverAt=now; play('hover');
  }, {passive:true});
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const item=event.target.closest('a,button,summary');
    if (!item || item===button || item.id==='themeToggle') return;
    if (item.closest('.project-card')) play('project');
    else if (item instanceof HTMLAnchorElement && item.hash) play('navigate');
    else play('click');
  });
}
