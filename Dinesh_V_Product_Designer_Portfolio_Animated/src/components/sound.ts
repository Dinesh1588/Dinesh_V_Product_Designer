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

function tone(ctx: AudioContext, frequency: number, duration: number, startDelay = 0, type: OscillatorType = 'sine', peak = .045, endFrequency?: number) {
  const start = ctx.currentTime + startDelay;
  const oscillator = ctx.createOscillator();
  const amp = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
  amp.gain.setValueAtTime(.0001, start);
  amp.gain.exponentialRampToValueAtTime(peak, start + .012);
  amp.gain.exponentialRampToValueAtTime(.0001, start + duration);
  oscillator.connect(amp);
  amp.connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + .03);
}

function noiseTap(ctx: AudioContext, start: number, duration: number, volume: number) {
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  source.buffer = buffer;
  filter.type = 'highpass';
  filter.frequency.value = 900;
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(start);
  source.stop(start + duration);
}

function play(kind: SoundName) {
  if (!enabled && kind !== 'theme') return;
  const ctx = getAudio();
  if (!ctx || ctx.state !== 'running') return;
  const now = ctx.currentTime;
  if (kind === 'hover') tone(ctx, 740, .055, 0, 'sine', .014, 990);
  if (kind === 'click') {
    noiseTap(ctx, now, .045, .035);
    tone(ctx, 185, .12, 0, 'sine', .05, 105);
    tone(ctx, 620, .12, .018, 'triangle', .035, 390);
    tone(ctx, 930, .09, .045, 'sine', .018, 700);
  }
  if (kind === 'navigate') {
    tone(ctx, 392, .13, 0, 'sine', .035, 587);
    tone(ctx, 587, .16, .07, 'sine', .03, 784);
    tone(ctx, 784, .19, .13, 'sine', .025, 988);
  }
  if (kind === 'project') [392, 494, 587, 784, 988].forEach((hz, i) => tone(ctx, hz, .2, i * .045, 'triangle', .022));
  if (kind === 'theme') [523.25, 659.25, 783.99].forEach((hz, i) => tone(ctx, hz, .2, i * .065, 'sine', .03));
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
    button.dataset.state = enabled ? 'on' : 'off';
  };

  render();
  button.addEventListener('click', async () => {
    const next = !enabled;
    const ctx = getAudio();
    if (next && ctx) {
      try {
        await ctx.resume();
        enabled = true;
        localStorage.setItem('dinesh-sound', 'on');
        // A tactile switch click followed by a short, bright ascending power-up chord.
        noiseTap(ctx, ctx.currentTime, .055, .055);
        tone(ctx, 165, .18, 0, 'sine', .07, 82);
        [523.25, 659.25, 783.99, 1046.5].forEach((hz, i) => tone(ctx, hz, .26, .045 + i * .055, 'sine', .045));
      } catch {
        enabled = false;
        localStorage.setItem('dinesh-sound', 'off');
      }
    } else {
      enabled = false;
      localStorage.setItem('dinesh-sound', 'off');
      if (ctx?.state === 'running') {
        noiseTap(ctx, ctx.currentTime, .04, .035);
        tone(ctx, 440, .12, 0, 'sine', .035, 220);
      }
    }
    render();
  });

  document.addEventListener('pointerover', event => {
    if (!(event.target instanceof Element)) return;
    const item = event.target.closest('a,button,summary');
    if (!item || item === button) return;
    const now = performance.now();
    if (now - hoverAt < 150) return;
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
