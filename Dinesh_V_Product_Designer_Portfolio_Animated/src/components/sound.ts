type SoundName = 'hover' | 'click' | 'navigate' | 'project' | 'theme';
let enabled = false;
let audio: AudioContext | null = null;
let hoverAt = 0;

function getAudio(): AudioContext | null {
  const Ctor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  audio ??= new Ctor();
  return audio;
}

function note(ctx: AudioContext, hz: number, duration: number, delay = 0, wave: OscillatorType = 'sine', volume = .035, to?: number) {
  const start = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = wave;
  osc.frequency.setValueAtTime(hz, start);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, start + duration);
  gain.gain.setValueAtTime(.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + .015);
  gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + .025);
}

function play(kind: SoundName) {
  if (!enabled) return;
  const ctx = getAudio();
  if (!ctx || ctx.state !== 'running') return;
  if (kind === 'hover') note(ctx, 720, .045, 0, 'sine', .018, 880);
  if (kind === 'click') {
    note(ctx, 510, .075, 0, 'triangle', .035, 390);
    note(ctx, 760, .09, .035, 'sine', .025, 620);
  }
  if (kind === 'navigate') {
    note(ctx, 440, .11, 0, 'sine', .03, 660);
    note(ctx, 660, .14, .075, 'sine', .024, 880);
  }
  if (kind === 'project') [440, 554, 659, 880].forEach((hz, i) => note(ctx, hz, .16, i * .05, 'sine', .025));
  if (kind === 'theme') [523.25, 659.25, 783.99].forEach((hz, i) => note(ctx, hz, .22, i * .07, 'sine', .035));
}

export function playSound(kind: SoundName) {
  play(kind);
}

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
  button.addEventListener('click', async () => {
    enabled = !enabled;
    localStorage.setItem('dinesh-sound', enabled ? 'on' : 'off');
    if (enabled) {
      const ctx = getAudio();
      if (ctx) {
        try {
          await ctx.resume();
          [587.33, 739.99, 880].forEach((hz, i) => note(ctx, hz, .28, i * .09, 'sine', .055));
        } catch {
          enabled = false;
          localStorage.setItem('dinesh-sound', 'off');
        }
      } else {
        enabled = false;
        localStorage.setItem('dinesh-sound', 'off');
      }
    }
    render();
  });

  document.addEventListener('pointerover', event => {
    if (!(event.target instanceof Element)) return;
    const item = event.target.closest('a,button,summary');
    if (!item || item === button) return;
    const now = performance.now();
    if (now - hoverAt < 140) return;
    hoverAt = now;
    play('hover');
  }, { passive: true });

  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const item = event.target.closest('a,button,summary');
    if (!item || item === button || item.id === 'themeToggle') return;
    if (item.closest('.project-card')) play('project');
    else if (item instanceof HTMLAnchorElement && item.hash) play('navigate');
    else play('click');
  });
}
