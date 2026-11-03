(() => {
"use strict";
/* ───── EDIT ME ───── */
const BORN = '2003-04-07';                 // date of birth, YYYY-MM-DD
const PROJECTS = [
  { id: 'key', name: 'keyaster', url: 'keyaster.vercel.app', tip: 'Type a word and watch your keyboard draw it as a constellation.', href: 'https://keyaster.vercel.app',
    icon: '<path d="M3 13l5-7 4 4 5-6"/><circle cx="3" cy="13" r="1.4" fill="currentColor"/><circle cx="8" cy="6" r="1.4" fill="currentColor"/><circle cx="12" cy="10" r="1.4" fill="currentColor"/><circle cx="17" cy="4" r="1.4" fill="currentColor"/>' },
  { id: 'brk', name: 'brinky', url: 'abhiggt.github.io/brinky', tip: 'A gentle nudge to drink water, stretch and sit up straight.', href: 'https://abhiggt.github.io/brinky',
    icon: '<path d="M10 2.5S4.5 9 4.5 12.3a5.5 5.5 0 0011 0C15.5 9 10 2.5 10 2.5z"/><path d="M7.5 13a2.5 2.5 0 002.5 2.5"/>' },
  { id: 'ety', name: 'etyms', url: 'abhiggt.github.io/etyms', tip: 'A small museum where every word tells you where it came from.', href: 'https://abhiggt.github.io/etyms',
    icon: '<path d="M3 7.5L10 3l7 4.5"/><path d="M4 8v7M8 8v7M12 8v7M16 8v7"/><path d="M2.5 17h15"/>' },
  { id: 'lkm', name: 'linkmery', url: 'abhiggt.github.io/lkm', tip: 'A quiet home for links, so they stop living in forty tabs.', href: 'https://abhiggt.github.io/lkm',
    icon: '<path d="M8.5 11.5a3.5 3.5 0 005 0l2.5-2.5a3.5 3.5 0 00-5-5L10 5"/><path d="M11.5 8.5a3.5 3.5 0 00-5 0L4 11a3.5 3.5 0 005 5l1-1"/>' },
  { id: 'udo', name: 'UDO', url: 'abhiggt.github.io/UDO', tip: 'Chidiya udd, the desk game we all grew up on, for one phone and a room of friends.', href: 'https://abhiggt.github.io/UDO',
    icon: '<path d="M2.5 9.5c2.5-3 5-3 7.5 0 2.5-3 5-3 7.5 0"/><path d="M10 9.5v5"/>' },
];
/* ─────────────────── */

const root = document.documentElement;
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const darkNow = () => root.dataset.theme === 'dark';
const $ = id => document.getElementById(id);
const wait = ms => new Promise(r => setTimeout(r, ms));

/* paint the sun: limb darkening, granulation and a soft corona */
(function sun() {
  const c = $('sunC'), g = c.getContext('2d'), W = c.width, cx = W / 2, r = W * .37;
  let gr = g.createRadialGradient(cx, cx, r * .8, cx, cx, W / 2);
  gr.addColorStop(0, 'rgba(255,196,96,.55)'); gr.addColorStop(.4, 'rgba(255,170,70,.18)'); gr.addColorStop(1, 'rgba(255,150,50,0)');
  g.fillStyle = gr; g.fillRect(0, 0, W, W);
  g.save(); g.beginPath(); g.arc(cx, cx, r, 0, 6.283); g.clip();
  gr = g.createRadialGradient(cx, cx, 0, cx, cx, r);
  gr.addColorStop(0, '#fffbe6'); gr.addColorStop(.5, '#ffe398'); gr.addColorStop(.82, '#ffb43a'); gr.addColorStop(1, '#e06a12');
  g.fillStyle = gr; g.fillRect(0, 0, W, W);
  for (let i = 0; i < 260; i++) { const a = Math.random() * 6.283, d = Math.sqrt(Math.random()) * r * .92, x = cx + Math.cos(a) * d, y = cx + Math.sin(a) * d;
    g.fillStyle = Math.random() < .5 ? 'rgba(255,248,220,.07)' : 'rgba(210,120,30,.06)'; g.beginPath(); g.arc(x, y, .6 + Math.random() * .6, 0, 6.283); g.fill(); }
  gr = g.createRadialGradient(cx - r * .3, cx - r * .3, 0, cx - r * .3, cx - r * .3, r * .7); gr.addColorStop(0, 'rgba(255,255,240,.35)'); gr.addColorStop(1, 'rgba(255,255,240,0)'); g.fillStyle = gr; g.fillRect(0, 0, W, W);
  g.restore();
})();
/* paint the moon: maria, a few craters, lit by tonight's phase with a little earthshine on the dark side */
(function moon() {
  const c = $('moonC'), g = c.getContext('2d'), W = c.width, cx = W / 2, r = W * .38;
  const off = document.createElement('canvas'); off.width = off.height = W; const o = off.getContext('2d');
  let gr = o.createRadialGradient(cx - r * .2, cx - r * .25, 0, cx, cx, r); gr.addColorStop(0, '#f3f2ec'); gr.addColorStop(1, '#c8c7c0');
  o.fillStyle = gr; o.beginPath(); o.arc(cx, cx, r, 0, 6.283); o.fill();
  [[-.35, -.3, .32], [.05, -.38, .22], [.22, -.05, .26], [-.1, .2, .2], [.35, .32, .14], [-.42, .1, .12]].forEach(([x, y, s]) => {
    const px = cx + x * r, py = cx + y * r, rr = s * r, m = o.createRadialGradient(px, py, 0, px, py, rr);
    m.addColorStop(0, 'rgba(110,110,116,.55)'); m.addColorStop(1, 'rgba(110,110,116,0)'); o.fillStyle = m; o.beginPath(); o.arc(px, py, rr, 0, 6.283); o.fill(); });
  [[.1, .55, .07], [-.5, -.55, .05], [.55, -.2, .045], [-.2, .62, .04]].forEach(([x, y, s]) => {
    const px = cx + x * r, py = cx + y * r, rr = s * r; o.strokeStyle = 'rgba(255,255,255,.55)'; o.lineWidth = 1; o.beginPath(); o.arc(px, py, rr, 0, 6.283); o.stroke();
    o.fillStyle = 'rgba(120,120,125,.35)'; o.beginPath(); o.arc(px + .6, py + .6, rr * .8, 0, 6.283); o.fill(); });
  const P = 29.530588853, age = (((Date.now() / 864e5 + 2440587.5 - 2451550.1) % P) + P) % P, th = age / P * 6.283;
  const Lx = Math.sin(th), Lz = -Math.cos(th);
  const img = o.getImageData(0, 0, W, W), d = img.data;
  for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
    const nx0 = (x + .5 - cx) / r, ny0 = (y + .5 - cx) / r, q0 = nx0 * nx0 + ny0 * ny0, i = (y * W + x) * 4; if (q0 > 1.12) continue;
    const sc = q0 > .998 ? Math.sqrt(.998 / q0) : 1, nx = nx0 * sc, ny = ny0 * sc, q = nx * nx + ny * ny;
    const nz = Math.sqrt(1 - q), lam = Math.max(0, nx * Lx + nz * Lz), lit = .2 + .8 * Math.min(1, lam * 1.6);
    d[i] *= lit; d[i + 1] *= lit; d[i + 2] *= lit * 1.03; if (q > .94) d[i + 3] = 255 * (1 - q) / .06;
  }
  o.putImageData(img, 0, 0);
  gr = g.createRadialGradient(cx, cx, r * .9, cx, cx, W / 2); gr.addColorStop(0, 'rgba(190,205,255,.35)'); gr.addColorStop(1, 'rgba(190,205,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, W, W); g.drawImage(off, 0, 0);
})();
/* footer sign-off with the time in Delhi */
(function () { const f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  const t = () => $('signoff').textContent = 'Delhi, ' + f.format(new Date()) + ' IST'; t(); setInterval(t, 30000); })();
/* theme switch */
let onTheme = null;
const paintMode = () => {
  const dk = darkNow();
  $('mode').setAttribute('aria-checked', dk ? 'true' : 'false'); $('mode').setAttribute('aria-label', dk ? 'Switch to day' : 'Switch to night');
  setView(); onTheme && onTheme();
};
$('mode').addEventListener('click', () => { root.dataset.theme = darkNow() ? 'light' : 'dark'; try { sessionStorage.setItem('abhiggt-mode', root.dataset.theme); } catch (e) {} paintMode(); });

/* days on earth */
(function earth() {
  const born = new Date(BORN + 'T00:00:00+05:30'), now = new Date();
  const days = Math.floor((now - born) / 864e5);
  let y = now.getFullYear() - born.getFullYear(), m = now.getMonth() - born.getMonth();
  if (now.getDate() < born.getDate()) m--; if (m < 0) { y--; m += 12; }
  $('days').firstChild.nodeValue = days.toLocaleString('en-IN');
  $('daysTip').textContent = `that's ${y} years and ${m} month${m === 1 ? '' : 's'}`;
  // social media and newer inventions that came after me; ChatGPT & Claude always come first
  const ARRIVALS = [['ChatGPT and Claude', 2022], ['the iPhone', 2007], ['Instagram', 2010], ['YouTube', 2005], ['WhatsApp', 2009], ['Threads', 2023]];
  const by = born.getFullYear(), el = $('older');
  const say = ([n, y]) => `about ${y - by} years before ${n} did :)`;
  let n = 0; try { n = +(localStorage.getItem('abhiggt-visit') || 0); localStorage.setItem('abhiggt-visit', n + 1); } catch (e) {}
  el.textContent = say(ARRIVALS[n % ARRIVALS.length]);
})();

/* headline words, written letter by letter, one line at a time, then a 3 second rest */
const WORDS_A = ['blank pages', 'blank screens', 'rough ideas'], WORDS_B = ['remember.', 'love using.', 'keep talking about.'];
function write(el, text) {
  el.textContent = '';
  [...text].forEach((c, i) => { const s = document.createElement('span'); s.className = 'ch' + (c === ' ' ? ' sp' : ''); s.textContent = c === ' ' ? ' ' : c; el.appendChild(s);
    if (RM) { s.style.opacity = 1; s.style.filter = 'none'; s.style.transform = 'none'; } else setTimeout(() => s.classList.add('in'), i * 75); });
  return wait(RM ? 0 : text.length * 75 + 420);
}
function erase(el) {
  const chs = [...el.children].reverse();
  chs.forEach((s, i) => setTimeout(() => { s.classList.remove('in'); s.classList.add('away'); }, i * 22));
  return wait(RM ? 0 : chs.length * 22 + 300);
}
(async () => {
  let i = 0;
  await write($('swapA'), WORDS_A[0]); await write($('swapB'), WORDS_B[0]);
  while (true) {
    await wait(5000);
    if (document.hidden) continue;
    const n = (i + 1) % WORDS_A.length;
    await erase($('swapA')); await write($('swapA'), WORDS_A[n]);
    await wait(600);
    await erase($('swapB')); await write($('swapB'), WORDS_B[n]);
    $('h1').setAttribute('aria-label', `I turn ${WORDS_A[n]} into things people ${WORDS_B[n]}`);
    i = n;
  }
})();



/* audio, unlocked by the first click or key press (browsers require it) */
let actx = null;
const unlock = () => { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); actx.resume && actx.resume(); } catch (e) {} };
['pointerdown', 'keydown', 'touchstart'].forEach(ev => addEventListener(ev, unlock, { passive: true }));

/* 🎸 hover to strum: six plucked strings, an open E major, a little apart */
function pluck(freq, when, gain) {
  const sr = actx.sampleRate, n = Math.floor(sr * 2.2), buf = actx.createBuffer(1, n, sr), d = buf.getChannelData(0);
  const P = Math.round(sr / freq); const ring = new Float32Array(P).map(() => Math.random() * 2 - 1);
  for (let i = 0; i < n; i++) { const j = i % P, nx = (j + 1) % P; const v = ring[j]; d[i] = v; ring[j] = .996 * .5 * (v + ring[nx]); }
  const src = actx.createBufferSource(); src.buffer = buf;
  const g = actx.createGain(); g.gain.setValueAtTime(gain, when); g.gain.exponentialRampToValueAtTime(.0001, when + 2.1);
  const lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3200;
  src.connect(lp).connect(g).connect(actx.destination); src.start(when);
}
let lastStrum = 0;
function strum() {
  unlock(); if (!actx || actx.state !== 'running' || RM) return;
  if (performance.now() - lastStrum < 900) return; lastStrum = performance.now();
  const t = actx.currentTime + .02;
  [82.41, 123.47, 164.81, 207.65, 246.94, 329.63].forEach((f, i) => pluck(f, t + i * .028, .09));
}
$('guitar').addEventListener('pointerenter', strum);
$('guitar').addEventListener('click', strum);



/* a little drum hit when it drops in: kick, snare, then a crash of hi-hat */
function drum() {
  unlock(); if (!actx) return; const t = actx.currentTime, out = actx.createGain(); out.gain.value = .5; out.connect(actx.destination);
  const kick = (at) => { const o = actx.createOscillator(), g = actx.createGain(); o.frequency.setValueAtTime(150, at); o.frequency.exponentialRampToValueAtTime(42, at + .16);
    g.gain.setValueAtTime(.9, at); g.gain.exponentialRampToValueAtTime(.001, at + .3); o.connect(g).connect(out); o.start(at); o.stop(at + .32); };
  const noise = (at, dur, freq, type, vol) => { const n = actx.createBufferSource(), b = actx.createBuffer(1, actx.sampleRate * dur, actx.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; n.buffer = b; const f = actx.createBiquadFilter(); f.type = type; f.frequency.value = freq;
    const g = actx.createGain(); g.gain.setValueAtTime(vol, at); g.gain.exponentialRampToValueAtTime(.001, at + dur); n.connect(f).connect(g).connect(out); n.start(at); };
  const snare = (at) => { noise(at, .2, 1800, 'highpass', .55); const o = actx.createOscillator(), g = actx.createGain(); o.type = 'triangle'; o.frequency.value = 190;
    g.gain.setValueAtTime(.4, at); g.gain.exponentialRampToValueAtTime(.001, at + .12); o.connect(g).connect(out); o.start(at); o.stop(at + .14); };
  kick(t); kick(t + .15); snare(t + .3); noise(t + .3, .7, 6500, 'highpass', .22);
}
/* 🏀 tap for a three: an arc, a swish, +3 */
let shooting = false;
function three() {
  if (shooting) return; shooting = true;
  const r = $('ball').getBoundingClientRect(), sx = r.left, sy = r.top;
  const hx = Math.min(innerWidth - 90, sx + 300), hy = Math.max(90, sy - 230);
  const hoop = document.createElement('div'); hoop.className = 'hoop';
  hoop.innerHTML = '<svg viewBox="0 0 64 58" fill="none"><rect x="6" y="2" width="52" height="30" rx="3" stroke="currentColor" stroke-width="2" opacity=".5"/><rect x="22" y="12" width="20" height="14" stroke="currentColor" stroke-width="1.5" opacity=".5"/><ellipse cx="32" cy="34" rx="15" ry="4" stroke="#e8642c" stroke-width="3"/><path d="M18 35l5 18M46 35l-5 18M25 36l3 17M39 36l-3 17M32 38v16" stroke="currentColor" stroke-width="1" opacity=".55"/></svg>';
  hoop.style.left = (hx - 32) + 'px'; hoop.style.top = (hy - 34) + 'px'; hoop.style.color = getComputedStyle(root).getPropertyValue('--fg');
  document.body.appendChild(hoop); requestAnimationFrame(() => hoop.classList.add('on'));
  const b = document.createElement('div'); b.className = 'shot'; b.textContent = '🏀'; document.body.appendChild(b);
  $('ball').style.visibility = 'hidden';
  const T = RM ? 1 : 1100, t0 = performance.now(), peak = 140;
  (function fly(now) {
    const t = Math.min(1, (now - t0) / T);
    const x = sx + (hx - 11 - sx) * t, y = sy + (hy - 20 - sy) * t - peak * 4 * t * (1 - t);
    b.style.transform = `translate(${x}px, ${y}px) rotate(${t * 540}deg)`;
    if (t < 1) return requestAnimationFrame(fly);
    // swish: drop through the net
    const t1 = performance.now();
    (function drop(n2) { const u = Math.min(1, (n2 - t1) / 380); b.style.transform = `translate(${hx - 11}px, ${hy - 20 + u * 46}px) rotate(540deg)`; b.style.opacity = 1 - u * .9;
      if (u < 1) return requestAnimationFrame(drop);
      drum(); const p = document.createElement('div'); p.className = 'three'; p.textContent = '+3 swish!'; p.style.left = (hx + 30) + 'px'; p.style.top = (hy - 50) + 'px'; document.body.appendChild(p);
      setTimeout(() => { b.remove(); p.remove(); hoop.classList.remove('on'); setTimeout(() => hoop.remove(), 300); $('ball').style.visibility = ''; shooting = false; }, 1100);
    })(t1);
  })(t0);
}
$('ball').addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') three(); });
$('ball').addEventListener('click', three);
$('ball').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); three(); } });
$('guitar').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); strum(); } });

/* side quests: desk (laptop) and orbit views */
const svg = p => `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${p.icon}</svg>`;
/* stickers: India Post stamp, matchbox label, rangoli, truck art and a postmark.
   tap opens the project; double-tap picks it up so it can be dragged (or carried with the mouse until the next click) */
const PERF = (w, h, r, gap) => { let c = ''; for (let x = gap / 2; x < w; x += gap) c += `<circle cx="${x}" cy="0" r="${r}"/><circle cx="${x}" cy="${h}" r="${r}"/>`; for (let y = gap / 2; y < h; y += gap) c += `<circle cx="0" cy="${y}" r="${r}"/><circle cx="${w}" cy="${y}" r="${r}"/>`; return c; };
const petals = (n, rad, rx, ry, fills, off = 0) => { let g = ''; for (let k = 0; k < n; k++) g += `<ellipse cx="0" cy="${-rad}" rx="${rx}" ry="${ry}" fill="${fills[k % fills.length]}" transform="rotate(${off + k * 360 / n})"/>`; return g; };
const dots = (n, rad, r, fill, off = 0) => { let g = ''; for (let k = 0; k < n; k++) { const a = (off + k * 360 / n) * Math.PI / 180; g += `<circle cx="${(Math.sin(a) * rad).toFixed(1)}" cy="${(-Math.cos(a) * rad).toFixed(1)}" r="${r}" fill="${fill}"/>`; } return g; };
const ART = {
  /* keyaster: an India Post stamp with a gold constellation */
  key: () => `<svg viewBox="0 0 160 196" aria-hidden="true"><defs><mask id="pfK"><rect width="160" height="196" fill="#fff"/><g fill="#000">${PERF(160, 196, 4.6, 13.33)}</g></mask></defs>
    <g filter="url(#stNews)"><rect width="160" height="196" fill="#fffdf6" mask="url(#pfK)"/>
    <rect x="12" y="12" width="136" height="172" fill="#1c2766"/><rect x="17" y="17" width="126" height="162" fill="none" stroke="#e7b54a" stroke-width="1.2"/><rect x="20" y="20" width="120" height="156" fill="none" stroke="#e7b54a" stroke-width=".5" opacity=".7"/>
    <text x="28" y="40" font-size="14" fill="#f3d27e">भारत</text><text x="132" y="40" font-size="11" fill="#f3d27e" text-anchor="end" class="mono" font-weight="600">INDIA</text>
    <g stroke="#f3d27e" stroke-width="1.1" fill="none" opacity=".85"><path d="M36 118 L58 84 L80 102 L104 70 L124 92"/><path d="M80 102 L92 132"/></g>
    <g fill="#fff6d8">${[[36,118,3],[58,84,3.6],[80,102,3],[104,70,4.4],[124,92,3],[92,132,2.6]].map(([x,y,r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
    <g fill="#f3d27e" opacity=".55">${[[44,62],[118,126],[30,90],[132,60],[64,140],[110,148]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="1"/>`).join('')}</g>
    <text x="80" y="166" font-size="22" fill="#fff6d8" text-anchor="middle">keyaster</text><text x="132" y="62" font-size="13" fill="#f3d27e" text-anchor="end">₹5</text></g></svg>`,
  /* brinky: a crown cap seen from a little above: domed steel top, a fluted skirt lit from the left, a worn print */
  brk: () => {
    const RX = 76, RY = 46, CY = -14, H = 30, N = 40, L = .55; let skirt = '', rim = '';
    const top = a => [RX * Math.cos(a), CY + RY * Math.sin(a)], bot = (a, deep) => [RX * (deep ? 1.03 : 1.1) * Math.cos(a), CY + RY * (deep ? 1.03 : 1.1) * Math.sin(a) + H - (deep ? 5 : 0)];
    const grey = v => { const c = Math.round(Math.max(55, Math.min(245, v))); return `rgb(${c},${c + 3},${c + 9})`; };
    for (let k = 0; k < N; k++) {
      const a0 = k / N * Math.PI * 2, am = (k + .5) / N * Math.PI * 2, a1 = (k + 1) / N * Math.PI * 2;
      if (Math.sin(am) < -.15) continue;                                  // the back of the skirt is hidden by the top
      const facing = Math.cos(am - Math.PI) * L + .45, base = 95 + facing * 120;
      const [t0x, t0y] = top(a0), [tmx, tmy] = top(am), [t1x, t1y] = top(a1), [b0x, b0y] = bot(a0, false), [bmx, bmy] = bot(am, true), [b1x, b1y] = bot(a1, false);
      skirt += `<path d="M${t0x.toFixed(1)} ${t0y.toFixed(1)} L${tmx.toFixed(1)} ${tmy.toFixed(1)} L${bmx.toFixed(1)} ${bmy.toFixed(1)} L${b0x.toFixed(1)} ${b0y.toFixed(1)}Z" fill="${grey(base + 30)}"/>`
        + `<path d="M${tmx.toFixed(1)} ${tmy.toFixed(1)} L${t1x.toFixed(1)} ${t1y.toFixed(1)} L${b1x.toFixed(1)} ${b1y.toFixed(1)} L${bmx.toFixed(1)} ${bmy.toFixed(1)}Z" fill="${grey(base - 45)}"/>`;
      rim += `${k === 0 || !rim ? 'M' : 'L'}${b0x.toFixed(1)} ${b0y.toFixed(1)} L${bmx.toFixed(1)} ${bmy.toFixed(1)} L${b1x.toFixed(1)} ${b1y.toFixed(1)} `;
    }
    return `<svg viewBox="-100 -78 200 156" aria-hidden="true"><defs>
      <linearGradient id="capTop" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbfcfd"/><stop offset=".45" stop-color="#d3d8de"/><stop offset="1" stop-color="#8d949e"/></linearGradient>
      <radialGradient id="capInk" cx=".4" cy=".35" r=".85"><stop offset="0" stop-color="#e5463e"/><stop offset="1" stop-color="#9e1e1c"/></radialGradient>
      <path id="capT" d="M-50,0 a50,50 0 1,1 100,0"/><path id="capU" d="M-57,0 a57,57 0 0,0 114,0"/></defs>
    <g filter="url(#stMetal)">${skirt}<path d="${rim}" fill="none" stroke="#5f656e" stroke-width=".8" stroke-linejoin="round"/>
      <ellipse cx="0" cy="${CY}" rx="${RX}" ry="${RY}" fill="url(#capTop)"/><ellipse cx="0" cy="${CY}" rx="${RX - 1}" ry="${RY - 1}" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.4"/>
      <ellipse cx="0" cy="${CY + 1}" rx="${RX - 7}" ry="${RY - 4.5}" fill="none" stroke="#9aa1aa" stroke-width="1.2"/>
      <g transform="translate(0 ${CY + 1}) scale(1 ${(RY / RX).toFixed(3)})">
        <circle r="64" fill="url(#capInk)"/><circle r="45" fill="#f6efdc"/>
        <text font-size="9.5" fill="#fbe9c9" class="mono" font-weight="700" letter-spacing="1.4"><textPath href="#capT" startOffset="50%" text-anchor="middle">SIP · STRETCH · SIT UP</textPath></text>
        <text font-size="8" fill="#fbe9c9" class="mono" font-weight="700" letter-spacing="2"><textPath href="#capU" startOffset="50%" text-anchor="middle">★ SODA WATER ★</textPath></text>
        <text y="9" font-size="26" fill="#b8231f" text-anchor="middle">brinky</text></g></g>
    <ellipse cx="-30" cy="${CY - 22}" rx="28" ry="9" fill="#fff" opacity=".45" transform="rotate(-14 -30 ${CY - 22})" filter="url(#stSoft)"/></svg>`; },
  /* etyms: a scrap torn out of the paper, mid-column, one word's history */
  ety: () => {
    const body = ['From the Latin apricus, “warmed by', 'the sun”. A dictionary of 1623 lists', 'it as “sunne-shine in winter”, and', 'then the word all but vanished.', 'The feeling never did: a cold Delhi', 'morning, and one warm patch of sun', 'on the balcony.'];
    return `<svg viewBox="0 0 210 196" aria-hidden="true">
    <path d="M10 14 L34 9 L52 15 L77 7 L101 13 L126 6 L149 12 L176 8 L200 15 L197 44 L203 71 L196 99 L201 128 L195 158 L199 186 L172 181 L148 189 L121 182 L96 190 L72 183 L47 189 L22 182 L8 187 L12 158 L6 129 L13 101 L7 72 L12 44Z" fill="#fbf8ef" filter="url(#stTorn)"/>
    <g filter="url(#stNews)"><path d="M14 18 L34 13 L52 19 L77 11 L101 17 L126 10 L149 16 L176 12 L195 19 L192 44 L198 71 L191 99 L196 128 L190 156 L194 181 L172 177 L148 184 L121 177 L96 185 L72 178 L47 184 L22 177 L13 182 L17 158 L11 129 L18 101 L12 72 L17 44Z" fill="#e9e1cb" filter="url(#stTorn)"/>
      <g fill="#2e2c27" style="font-family:Georgia,'Times New Roman',serif"><text class="np" x="30" y="23" font-size="8" opacity=".5">ually the market for a ny in the old ci</text>
      <text x="22" y="44" font-size="7.5" class="mono" font-weight="700" letter-spacing="1.6" fill="#5b564b">WORD HISTORY · etyms</text><rect x="22" y="49" width="160" height=".8"/>
      <text class="np" x="22" y="77" font-size="29" font-weight="700" letter-spacing="-.5">apricity</text><text class="np" x="146" y="77" font-size="9" font-style="italic" fill="#4a463d">n., archaic</text>
      ${body.map((t, k) => `<text class="np" x="22" y="${95 + k * 11.8}" font-size="10" ${k === body.length - 1 ? '' : 'textLength="162" lengthAdjust="spacing"'}>${t}</text>`).join('')}
      <text class="np" x="22" y="181" font-size="8" opacity=".5">Continued on p</text></g></g></svg>`; },
  /* linkmery: an old brass library key: cast clover bow, turned collar, round shaft, cut bit; manila tag on a string */
  lkm: () => `<svg viewBox="0 0 270 170" aria-hidden="true"><defs>
      <radialGradient id="kBow" gradientUnits="userSpaceOnUse" cx="40" cy="38" r="46"><stop offset="0" stop-color="#fff0bd"/><stop offset=".35" stop-color="#ddb05a"/><stop offset=".75" stop-color="#9a6a1f"/><stop offset="1" stop-color="#5b3b0c"/></radialGradient>
      <linearGradient id="kShaft" gradientUnits="userSpaceOnUse" x1="0" y1="44" x2="0" y2="60"><stop offset="0" stop-color="#5e3d0d"/><stop offset=".25" stop-color="#e3b862"/><stop offset=".42" stop-color="#fff2c6"/><stop offset=".62" stop-color="#b48530"/><stop offset="1" stop-color="#4a2f08"/></linearGradient>
      <linearGradient id="kBit" gradientUnits="userSpaceOnUse" x1="0" y1="56" x2="0" y2="86"><stop offset="0" stop-color="#d9ab55"/><stop offset=".5" stop-color="#a87a28"/><stop offset="1" stop-color="#5e3d0d"/></linearGradient>
      <linearGradient id="kTag" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eedfb8"/><stop offset="1" stop-color="#d6bf8a"/></linearGradient>
      <mask id="kHoles" maskUnits="userSpaceOnUse" x="0" y="0" width="270" height="170"><rect width="270" height="170" fill="#fff"/><circle cx="50" cy="52" r="8" fill="#000"/>
        ${[[50, 31], [29, 52], [50, 73]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.2" fill="#000"/>`).join('')}</mask></defs>
    <path d="M38 70 C50 112 96 124 146 112" fill="none" stroke="#8f826b" stroke-width="1.4"/><path d="M39 71 C52 115 98 126 146 114" fill="none" stroke="#cdbf9f" stroke-width=".7"/>
    <g transform="rotate(-9 50 52)" filter="url(#stMetal)">
      <g mask="url(#kHoles)" stroke="#5a3a0c" stroke-width=".9">
        <circle cx="50" cy="31" r="15" fill="url(#kBow)"/><circle cx="29" cy="52" r="15" fill="url(#kBow)"/><circle cx="50" cy="73" r="15" fill="url(#kBow)"/>
        <circle cx="50" cy="52" r="18" fill="url(#kBow)" stroke="none"/></g>
      <path d="M38 22 a14 14 0 0 1 18 -4 M19 44 a14 14 0 0 1 6 -6" fill="none" stroke="#fff5d8" stroke-width="2" stroke-linecap="round" opacity=".8"/>
      <circle cx="50" cy="52" r="8" fill="none" stroke="#3d2706" stroke-width="1.6" opacity=".6"/>
      <rect x="66" y="45" width="14" height="14" rx="3" fill="url(#kShaft)"/><rect x="79" y="42" width="6" height="20" rx="3" fill="url(#kShaft)"/><rect x="87" y="44" width="5" height="16" rx="2.5" fill="url(#kShaft)"/>
      <rect x="91" y="47" width="142" height="10" rx="5" fill="url(#kShaft)"/><circle cx="234" cy="52" r="5.5" fill="url(#kShaft)"/>
      <path d="M196 56 h33 v28 h-7 v-9 h-6 v14 h-7 v-14 h-5 v9 h-8z" fill="url(#kBit)" stroke="#5a3a0c" stroke-width=".8"/>
      <path d="M196 57 h33" stroke="#fff0c0" stroke-width="1" opacity=".6"/></g>
    <g transform="rotate(5 196 122)" filter="url(#stNews)"><path d="M148 98 h96 a4 4 0 0 1 4 4 v42 a4 4 0 0 1 -4 4 h-96 l-13 -13 v-24z" fill="url(#kTag)"/>
      <circle cx="148" cy="123" r="7.5" fill="#cbb37c"/><circle cx="148" cy="123" r="3.3" fill="#fbf7ec"/>
      <text x="162" y="114" font-size="6.8" fill="#7a6a45" class="mono" font-weight="700" letter-spacing="1">CITY LIBRARY · 42</text><rect x="162" y="118" width="78" height=".7" fill="#a08c5c"/>
      <text x="162" y="139" fill="#2a2620" style="font-family:'Reenie Beanie',cursive" font-size="27">linkmery</text></g></svg>`,
  /* UDO: a postmark for chidiya udd */
  udo: () => `<svg viewBox="-100 -100 200 200" aria-hidden="true"><defs><path id="pmU" d="M0,-66 a66,66 0 1,1 -0.1,0"/></defs><g filter="url(#stNews)"><circle r="98" fill="#fff"/><circle r="90" fill="#fbf2df"/>
    <g fill="none" stroke="#2c3a94" opacity=".92"><circle r="80" stroke-width="2.4"/><circle r="54" stroke-width="1.6"/>
      <path d="M-46 -12 q12 -10 24 0 q12 10 24 0 q12 -10 24 0 q12 10 24 0" stroke-width="1.6" opacity=".5"/><path d="M-46 36 q12 -10 24 0 q12 10 24 0 q12 -10 24 0 q12 10 24 0" stroke-width="1.6" opacity=".5"/></g>
    <text font-size="11.5" fill="#2c3a94" class="mono" font-weight="700" opacity=".92"><textPath href="#pmU">CHIDIYA UDD ✦ NEW DELHI ✦ 110045 ✦ </textPath></text>
    <path d="M-24 -26 q12 -14 24 -2 q12 -14 24 2 q-12 -6 -24 6 q-12 -12 -24 -6z" fill="#e8590c"/>
    <text y="24" font-size="32" fill="#2c3a94" text-anchor="middle">UDO</text></g></svg>`,
};
/* made real versions of the stickers from PROMPTS.md? list them here and they replace the drawn ones, e.g. key: 'assets/stickers/keyaster.png' */
const STICKER_ART = {};
const STK = { key: [192, -6, .02, .02], brk: [210, 4, .14, .6], ety: [270, -3, .34, .02], lkm: [330, 2, .5, .6], udo: [212, -7, .78, .04] };
const desk = $('deskView');
desk.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <filter id="stNews" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 .32  0 0 0 0 .28  0 0 0 0 .2  .7 0 0 0 -.24" result="g"/><feComposite in="g" in2="SourceGraphic" operator="in" result="g2"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g2"/></feMerge></filter>
  <filter id="stTorn" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".22" numOctaves="3" seed="9" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="5" xChannelSelector="R" yChannelSelector="G"/></filter>
  <filter id="stMetal" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.4 .25" numOctaves="2" seed="2" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 .2  0 0 0 0 .18  0 0 0 0 .14  .45 0 0 0 -.16" result="g"/><feComposite in="g" in2="SourceGraphic" operator="in" result="g2"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g2"/></feMerge></filter>
  <filter id="stSoft"><feGaussianBlur stdDeviation="5"/></filter>
</defs></svg>`);
let topZ = 10;
PROJECTS.forEach((p, i) => {
  const [w, r, fx, fy] = STK[p.id] || [180, (i % 2 ? 5 : -5), (i * .19) % .82, (i % 2) * .5];
  const a = document.createElement('a'); a.className = 'stk'; a.href = p.href; a.target = '_blank'; a.rel = 'noopener'; a.draggable = false;
  a.style.setProperty('--w', w + 'px'); a.style.setProperty('--r', r + 'deg'); a.style.left = (fx * 100) + '%'; a.style.top = (fy * 100) + '%'; a.style.zIndex = ++topZ;
  a.innerHTML = STICKER_ART[p.id] ? `<img src="${STICKER_ART[p.id]}" alt="" draggable="false" style="display:block;width:100%;height:auto">` : (ART[p.id] || ART.ety)(); a.setAttribute('aria-label', `${p.name}: ${p.tip} Opens in a new tab.`); a.title = p.name + ' — ' + p.tip;
  desk.appendChild(a);
  let drag = null, down = null;
  const place = (cx, cy) => {
    const b = desk.getBoundingClientRect(), W = b.width, H = b.height;
    const x = Math.min(W - a.offsetWidth * .6, Math.max(-a.offsetWidth * .4, cx - b.left - drag.ox)), y = Math.min(H - a.offsetHeight * .5, Math.max(-a.offsetHeight * .3, cy - b.top - drag.oy));
    a.style.left = (x / W * 100) + '%'; a.style.top = (y / H * 100) + '%';
  };
  a.addEventListener('pointerdown', e => { if (e.button || innerWidth <= 720) return; down = e; drag = null; });
  a.addEventListener('pointermove', e => {
    if (!down) return;
    if (!drag && Math.abs(e.clientX - down.clientX) + Math.abs(e.clientY - down.clientY) > 5) {
      const b = a.getBoundingClientRect(); drag = { ox: down.clientX - b.left, oy: down.clientY - b.top }; a.classList.add('lifted'); a.style.zIndex = ++topZ; try { a.setPointerCapture(e.pointerId); } catch (_) {}
    }
    if (drag) { e.preventDefault(); place(e.clientX, e.clientY); }
  });
  const end = () => { down = null; if (drag) { a.classList.remove('lifted'); a.dataset.moved = '1'; setTimeout(() => delete a.dataset.moved, 50); } drag = null; };
  a.addEventListener('pointerup', end); a.addEventListener('pointercancel', end);
  a.addEventListener('click', e => { if (a.dataset.moved) e.preventDefault(); });   // a plain click opens it; a drag doesn't
});
/* polaroids: by day they fall into place under gravity and stay where you put them; by night they float */
(function polaroids() {
  const box = $('polas'); if (!box) return;
  const P = [...box.querySelectorAll('.pola')].map((el, i) => ({ el, i, x: 0, y: -720, vx: 0, vy: 0, r: 0, vr: 0, t0: i * .16, held: false, placed: false }));
  let on = false, dropped = false, last = 0, raf = 0;
  const live = () => innerWidth > 980 && !RM;
  const put = p => { p.el.style.setProperty('--dx', p.x.toFixed(1) + 'px'); p.el.style.setProperty('--dy', p.y.toFixed(1) + 'px'); p.el.style.setProperty('--dr', p.r.toFixed(2) + 'deg'); };
  function step(now) {
    raf = 0; if (!on || !live()) return;
    const dt = Math.min(.04, (now - (last || now)) / 1000); last = now; const night = darkNow(), T = now / 1000;
    for (const p of P) {
      if (p.held) { put(p); continue; }
      if (night) {                                            // zero gravity: a slow drift, a weak pull home, a lazy spin
        p.vx += (-p.x * .25 + Math.sin(T * .31 + p.i * 1.7) * 6) * dt; p.vy += (-p.y * .25 + Math.cos(T * .27 + p.i * 2.3) * 6) * dt;
        p.vr += (-p.r * .2 + Math.sin(T * .4 + p.i) * .4) * dt;
        p.vx *= 1 - .25 * dt; p.vy *= 1 - .25 * dt; p.vr *= 1 - .3 * dt;
      } else if (!p.placed) {                                 // gravity: fall, bounce once or twice, settle
        if (T < p.start) { p.y = -720; p.el.style.visibility = 'hidden'; put(p); continue; }
        p.el.style.visibility = '';
        p.vy += 2600 * dt; p.vx *= 1 - 2 * dt; p.vr *= 1 - 2 * dt;
        if (p.y + p.vy * dt > p.floor) { p.y = p.floor; p.vy *= -.32; p.vr *= .5; if (Math.abs(p.vy) < 60) { p.vy = 0; p.placed = true; } }
      } else { p.vx = p.vy = p.vr = 0; }
      p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt; put(p);
    }
    raf = requestAnimationFrame(step);
  }
  const run = () => { if (!raf && on && live()) { last = 0; raf = requestAnimationFrame(step); } };
  new IntersectionObserver(es => { on = es[0].isIntersecting;
    if (on && !dropped && live()) { dropped = true; const T = performance.now() / 1000;
      if (darkNow()) P.forEach(p => { p.x = (Math.random() - .5) * 30; p.y = (Math.random() - .5) * 40; p.placed = true; p.el.style.visibility = ''; });
      else P.forEach(p => { p.start = T + p.t0; p.floor = 0; p.vr = (Math.random() - .5) * 60; }); }
    run(); }, { rootMargin: '120px' }).observe(box);
  if (live()) P.forEach(p => { put(p); p.el.style.visibility = 'hidden'; });
  // drag any of them; at night a flick sends it drifting
  P.forEach(p => {
    let sx, sy, hist = [];
    p.el.addEventListener('pointerdown', e => { if (e.button || !live()) return; e.preventDefault(); p.held = true; p.placed = true; p.el.classList.add('held'); p.el.style.zIndex = 30 + p.i;
      sx = e.clientX - p.x; sy = e.clientY - p.y; hist = [[e.clientX, e.clientY, performance.now()]]; p.el.setPointerCapture(e.pointerId); run(); });
    p.el.addEventListener('pointermove', e => { if (!p.held) return; p.x = e.clientX - sx; p.y = e.clientY - sy; hist.push([e.clientX, e.clientY, performance.now()]); if (hist.length > 5) hist.shift(); });
    const up = () => { if (!p.held) return; p.held = false; p.el.classList.remove('held');
      const a = hist[0], b = hist[hist.length - 1], dt = (b[2] - a[2]) / 1000;
      if (darkNow() && dt > .01) { p.vx = (b[0] - a[0]) / dt * .5; p.vy = (b[1] - a[1]) / dt * .5; p.vr = (p.vx / 40); } else { p.vx = p.vy = p.vr = 0; } };
    p.el.addEventListener('pointerup', up); p.el.addEventListener('pointercancel', up);
  });
  addEventListener('resize', () => { if (!live()) P.forEach(p => { p.el.style.removeProperty('--dx'); p.el.style.removeProperty('--dy'); p.el.style.removeProperty('--dr'); }); else { P.forEach(put); run(); } });
})();
/* phone: a plain list */
const list = $('listView');
PROJECTS.forEach(p => {
  const a = document.createElement('a'); a.href = p.href; a.target = '_blank'; a.rel = 'noopener';
  a.innerHTML = `<span class="fav">${svg(p)}</span><span><b>${p.name}</b><small>${p.tip}</small></span><span class="arrow" aria-hidden="true">↗</span>`;
  const li = document.createElement('li'); li.appendChild(a); list.appendChild(li);
});
const orbit = $('orbitView');
const NS = 'http://www.w3.org/2000/svg';
const pathBack = document.createElementNS(NS, 'svg'), pathFront = document.createElementNS(NS, 'svg');
pathBack.setAttribute('class', 'path back'); pathFront.setAttribute('class', 'path front');
const ellBack = document.createElementNS(NS, 'path'), arcFront = document.createElementNS(NS, 'path');
pathBack.appendChild(ellBack); pathFront.appendChild(arcFront); orbit.append(pathBack, pathFront);

/* each project is a star: a hot core, a coloured glow and diffraction spikes, twinkling gently */
const STARS = { key: [[196, 212, 255], 1.45], brk: [[160, 232, 255], .95], ety: [[255, 210, 140], 1.25], lkm: [[255, 160, 110], .9], udo: [[236, 255, 240], 1] };
const DPR = Math.min(devicePixelRatio || 1, 2);
function paintStar(p, t) {
  const c = p.ctx, W = p.cv.width, cx = W / 2, light = !darkNow();
  const [R, G, B] = p.col, tw = RM ? 1 : .7 + .18 * Math.sin(t * 2.1 + p.ph * 3.1) + .12 * Math.sin(t * 6.3 + p.ph * 7.7), r = W * .075 * p.mag * tw * (p.el && p.el.matches(':hover') ? 1.25 : 1);
  c.clearRect(0, 0, W, W);
  c.globalCompositeOperation = light ? 'source-over' : 'lighter';
  const k = light ? .72 : 1, col = a => `rgba(${R * k | 0},${G * k | 0},${B * k | 0},${a})`;
  const g = c.createRadialGradient(cx, cx, 0, cx, cx, W / 2);
  g.addColorStop(0, light ? col(1) : 'rgba(255,255,255,1)'); g.addColorStop(r / (W / 2) * 1.1, col(.95));
  g.addColorStop(Math.min(.95, r / (W / 2) * 3.4), col(light ? .28 : .22)); g.addColorStop(1, col(0));
  c.fillStyle = g; c.beginPath(); c.arc(cx, cx, W / 2, 0, 6.283); c.fill();
  const spike = (ang, len, wid) => {
    const dx = Math.cos(ang), dy = Math.sin(ang), lg = c.createLinearGradient(cx - dx * len, cx - dy * len, cx + dx * len, cx + dy * len);
    lg.addColorStop(0, col(0)); lg.addColorStop(.5, light ? col(.9) : 'rgba(255,255,255,.95)'); lg.addColorStop(1, col(0));
    c.strokeStyle = lg; c.lineWidth = wid; c.beginPath(); c.moveTo(cx - dx * len, cx - dy * len); c.lineTo(cx + dx * len, cx + dy * len); c.stroke();
  };
  spike(0, W * .48 * tw, r * .32); spike(Math.PI / 2, W * .48 * tw, r * .32);
  spike(Math.PI / 4, W * .24, r * .18); spike(-Math.PI / 4, W * .24, r * .18);
  c.globalCompositeOperation = 'source-over';
}
const SIZES = { key: 58, brk: 42, ety: 50, lkm: 40, udo: 44 };   // new projects default to 62
PROJECTS.forEach((p, i) => {
  const a = document.createElement('a'); a.className = 'planet'; a.href = p.href; a.target = '_blank'; a.rel = 'noopener';
  const d = SIZES[p.id] || 44, box = Math.round(d * 2.2);
  const look = STARS[p.id] || [[[200, 220, 255], [255, 220, 170], [255, 240, 230], [190, 240, 255]][i % 4], 1];
  const cv = document.createElement('canvas'); cv.width = cv.height = Math.round(box * DPR); cv.style.width = cv.style.height = box + 'px';
  p.cv = cv; p.ctx = cv.getContext('2d'); p.col = look[0]; p.mag = look[1]; p.box = box; p.d = d;
  a.appendChild(cv);
  a.insertAdjacentHTML('beforeend', `<span class="name" style="top:calc(50% + ${Math.round(d * .62)}px)">${p.name} ↗</span><span class="tip"><b>${p.name}</b>${p.tip}<i>open ↗</i></span>`);
  a.setAttribute('aria-label', `${p.name}: ${p.tip}`);
  a.style.width = a.style.height = box + 'px'; a.style.transformOrigin = '50% 50%';
  p.el = a; p.ph = i / PROJECTS.length * Math.PI * 2; orbit.appendChild(a);
  paintStar(p, 0);
});
function setView() {
  const view = darkNow() ? 'orbit' : 'desk';
  $('deskView').hidden = view !== 'desk'; orbit.hidden = view !== 'orbit';
}
/* the stars sit where they are, joined like a constellation, each drifting a little */
/* Abhijit, the nakshatra I'm named after: Vega and the little parallelogram of Lyra under it */
const SPOTS = [[.12, .06], [.36, .44], [.84, .3], [.94, .9], [.44, 1], [.62, .02], [.02, .7], [.7, .62], [.22, .9], [.98, .02]];
const LYRA = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 1]];
const EPS = [.0, -.04];   // ε Lyrae, the faint double star beside Vega
const epsDot = document.createElementNS(NS, 'circle'); epsDot.setAttribute('r', '2.2'); epsDot.setAttribute('fill', '#cfd8ff'); pathBack.appendChild(epsDot);
orbit.insertAdjacentHTML('beforeend', '<p class="nak"><b>Abhijit</b>the nakshatra I\'m named after</p><p class="star-hint">every star is a project · click one</p>');
let orbT = 0, spinTick = 0;
function drawOrbit(dt) {
  if (orbit.hidden || getComputedStyle(orbit).display === 'none') return;
  if (!RM) orbT += dt;
  const W = orbit.clientWidth, H = orbit.clientHeight, padX = 70, padY = 50;
  const pts = PROJECTS.map((p, i) => { const [fx, fy] = SPOTS[i % SPOTS.length];
    return [padX + fx * (W - 2 * padX) + Math.sin(orbT * .25 + i * 1.7) * 6, padY + fy * (H - 2 * padY) + Math.cos(orbT * .21 + i * 2.3) * 5]; });
  const f = n => n.toFixed(1), ex = padX + EPS[0] * (W - 2 * padX), ey = padY + EPS[1] * (H - 2 * padY);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}L${f(ex)} ${f(ey)}`; epsDot.setAttribute('cx', f(ex)); epsDot.setAttribute('cy', f(ey));
  LYRA.forEach(([a, b]) => { if (pts[a] && pts[b]) d += `M${f(pts[a][0])} ${f(pts[a][1])}L${f(pts[b][0])} ${f(pts[b][1])}`; });
  ellBack.setAttribute('d', d); arcFront.setAttribute('d', '');
  spinTick++;
  PROJECTS.forEach((p, i) => {
    const [x, y] = pts[i];
    p.el.style.transform = `translate(${(x - p.box / 2).toFixed(1)}px, ${(y - p.box / 2).toFixed(1)}px)`;
    p.el.style.zIndex = 10;
    paintStar(p, performance.now() / 1000);
  });
}
function lidFromScroll() {}
const deskClock = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });


/* header turns solid once you scroll */
const header = $('header'), brand = $('brand');
[...'abhiggt'].forEach((c, i, a) => { const sp = document.createElement('span'); sp.textContent = c; sp.style.setProperty('--i', i + 1); sp.style.transitionDelay = ((a.length - i) * 35) + 'ms'; brand.querySelector('.word').appendChild(sp); });

/* stars by night, pencil scribbles by day; both at 40% at most */
const sky = $('sky'), sx = sky.getContext('2d');
let stars = [];
function sizeSky() {
  const d = Math.min(devicePixelRatio || 1, 2);
  sky.width = innerWidth * d; sky.height = innerHeight * d; sx.setTransform(d, 0, 0, d, 0, 0);
  const n = Math.round(innerWidth * innerHeight / 9000);
  stars = Array.from({ length: n }, () => {
    const L = 2 + Math.random() * 3.5, k = 2 + (Math.random() * 3 | 0), a0 = Math.random() * Math.PI;
    const strokes = Array.from({ length: k }, (_, i) => { const a = a0 + i * Math.PI / k + (Math.random() - .5) * .5, l = L * (.7 + Math.random() * .5); return [Math.cos(a) * l, Math.sin(a) * l, (Math.random() - .5) * .8]; });
    return { x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: Math.random() < .9 ? .5 + Math.random() * .5 : 1 + Math.random() * .5,
      ph: Math.random() * 6.283, sp: .15 + Math.random() * .4, max: .4 * (.45 + Math.random() * .55), strokes };
  });
  sizeTrail();
}
function drawSky(t) {
  sx.clearRect(0, 0, innerWidth, innerHeight);
  const dk = darkNow();
  for (const s of stars) {
    const a = RM ? s.max * .7 : s.max * Math.pow(.5 + .5 * Math.sin(t / 1000 * s.sp + s.ph), 2);
    if (dk) { sx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`; sx.beginPath(); sx.arc(s.x, s.y, s.r, 0, 6.283); sx.fill(); }
    else { sx.strokeStyle = `rgba(70,70,78,${a.toFixed(3)})`; sx.lineWidth = .75; sx.lineCap = 'round'; sx.beginPath(); for (const [dx, dy, w] of s.strokes) { sx.moveTo(s.x - dx, s.y - dy + w); sx.lineTo(s.x + dx, s.y + dy - w); } sx.stroke(); }
  }
}

/* cursor: a faint constellation by night, a pencil line by day */
const tc = $('trail'), tx = tc.getContext('2d');
const fine = matchMedia('(pointer: fine)').matches;
let pts = [], last = null, INK = null;
try { const v = localStorage.getItem('abhiggt-ink'); if (v) INK = JSON.parse(v); } catch (e) {}
/* the crayon row: hover a colour, hold still, and the trail takes it */
(function crayons() {
  const C = [['ink blue', '#2f4aa8'], ['terracotta', '#c0573b'], ['sage', '#7f9a7a'], ['charcoal', '#3a3a3f'], ['ochre', '#c99a3c'], ['plum', '#7a3d6b'], ['slate', '#5d7387'], ['rose', '#c7848a'], ['forest', '#2f5d4a'], ['sand', '#b9a487']];
  const row = $('crayons'), note = $('crayonNote');
  row.insertAdjacentHTML('beforebegin', '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="crayonTex"><feTurbulence type="fractalNoise" baseFrequency=".6 .09" numOctaves="3" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2" xChannelSelector="R" yChannelSelector="G" result="d"/><feComposite in="d" in2="n" operator="arithmetic" k1="0" k2="1" k3="-.18" k4=".06"/></filter></svg>');
  C.forEach(([name, hex]) => { const i = document.createElement('i'); i.style.setProperty('--c', hex); i.dataset.name = name; i.title = name; row.appendChild(i); });
  const rgb = h => [1, 3, 5].map(k => parseInt(h.slice(k, k + 2), 16));
  const mark = () => [...row.children].forEach(i => i.classList.toggle('on', !!INK && i.dataset.name === INK.name));
  if (INK) { note.textContent = `your cursor is ${INK.name} · hover another to change it`; mark(); }
  let t = 0;
  row.addEventListener('pointermove', e => {
    const i = e.target.closest('i'); if (!i) return; clearTimeout(t);
    t = setTimeout(() => { INK = { name: i.dataset.name, rgb: rgb(C.find(c => c[0] === i.dataset.name)[1]) };
      try { localStorage.setItem('abhiggt-ink', JSON.stringify(INK)); } catch (e) {}
      note.textContent = `your cursor is now ${INK.name}`; mark(); }, 380);
  });
  row.addEventListener('pointerleave', () => clearTimeout(t));
})();
function sizeTrail() { const d = Math.min(devicePixelRatio || 1, 2); tc.width = innerWidth * d; tc.height = innerHeight * d; tx.setTransform(d, 0, 0, d, 0, 0); }
if (fine && !RM) addEventListener('pointermove', e => {
  const p = { x: e.clientX, y: e.clientY }, dk = darkNow(), gap = dk ? 36 : 7;
  if (!last || Math.hypot(p.x - last.x, p.y - last.y) > gap) {
    pts.push({ x: p.x + (dk ? (Math.random() - .5) * 10 : (Math.random() - .5) * 1.6), y: p.y + (dk ? (Math.random() - .5) * 10 : (Math.random() - .5) * 1.6), life: 1, r: .8 + Math.random() * 1.1 });
    if (pts.length > (dk ? 16 : 70)) pts.shift();
    last = p;
  }
}, { passive: true });
function drawTrail(dt) {
  tx.clearRect(0, 0, innerWidth, innerHeight);
  if (!pts.length) return;
  const dk = darkNow();
  pts.forEach(p => p.life -= dt * (dk ? .9 : 1.1)); pts = pts.filter(p => p.life > 0);
  if (dk) {
    tx.lineWidth = .7;
    for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i]; const [ir, ig, ib] = INK ? INK.rgb : [147, 166, 255]; tx.strokeStyle = `rgba(${ir},${ig},${ib},${(Math.min(a.life, b.life) * (INK ? .4 : .22)).toFixed(3)})`; tx.beginPath(); tx.moveTo(a.x, a.y); tx.lineTo(b.x, b.y); tx.stroke(); }
    for (const p of pts) { const [ir, ig, ib] = INK ? INK.rgb : [147, 166, 255]; tx.fillStyle = `rgba(${ir},${ig},${ib},${(p.life * (INK ? .7 : .4)).toFixed(3)})`; tx.beginPath(); tx.arc(p.x, p.y, p.r, 0, 6.283); tx.fill(); }
  } else {
    tx.lineCap = 'round'; tx.lineJoin = 'round';
    for (const off of [0, .7]) for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i];
      const [ir, ig, ib] = INK ? INK.rgb : [52, 52, 58]; tx.strokeStyle = `rgba(${ir},${ig},${ib},${(Math.min(a.life, b.life) * (off ? .2 : INK ? .75 : .4)).toFixed(3)})`; tx.lineWidth = off ? .6 : INK ? 1.6 : 1;
      tx.beginPath(); tx.moveTo(a.x + off, a.y - off); tx.lineTo(b.x + off, b.y - off); tx.stroke();
    }
  }
}

/* launch rumble */
function rumble() {
  if (!actx || actx.state !== 'running' || RM) return;
  const t = actx.currentTime, len = 4;
  const buf = actx.createBuffer(1, actx.sampleRate * len, actx.sampleRate), d = buf.getChannelData(0);
  let b = 0; for (let i = 0; i < d.length; i++) { b = .985 * b + .015 * (Math.random() * 2 - 1); d[i] = b * 6; }
  const src = actx.createBufferSource(); src.buffer = buf;
  const lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.setValueAtTime(140, t); lp.frequency.linearRampToValueAtTime(520, t + 1.6); lp.frequency.linearRampToValueAtTime(220, t + len);
  const g = actx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.09, t + .9); g.gain.linearRampToValueAtTime(.06, t + 2); g.gain.linearRampToValueAtTime(0, t + len);
  src.connect(lp).connect(g).connect(actx.destination); src.start(t); src.stop(t + len);
}

/* scroll */
let target = 0, lastY = 0;
const readScroll = () => { const max = document.documentElement.scrollHeight - innerHeight; target = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0; const sw = document.querySelector('.switch'); sw.classList.toggle('drawn', target > .5); sw.style.setProperty('--sh', (1 - target * .45).toFixed(3)); brand.classList.toggle('tucked', scrollY > 40); header.classList.toggle('away', scrollY > lastY && scrollY > 120); lastY = scrollY; lidFromScroll(); };
addEventListener('scroll', readScroll, { passive: true });
setView(); readScroll();
sizeSky();


let tLast = performance.now();
function startLoop(fn) { const loop = t => { const dt = Math.min((t - tLast) / 1000, .1); tLast = t; drawSky(t); drawTrail(dt); drawOrbit(dt); fn && fn(dt); requestAnimationFrame(loop); }; requestAnimationFrame(loop); }
if (!window.THREE) { paintMode(); startLoop(); return; }
let renderer;
try { renderer = new THREE.WebGLRenderer({ canvas: $('stage'), antialias: true, alpha: true }); }
catch (e) { paintMode(); startLoop(); return; }
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
renderer.setClearColor(0x000000, 0);
renderer.outputEncoding = THREE.sRGBEncoding;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(16, 1, .1, 200);
camera.position.set(0, 0, 21);
const hemi = new THREE.HemisphereLight(0xfbfaf6, 0x3a3a40, .78);
const key = new THREE.DirectionalLight(0xfff3e4, .5); key.position.set(-6, 5, 5);
const fill = new THREE.DirectionalLight(0xc9d6ff, .14); fill.position.set(5, -1, 4);
const rim = new THREE.DirectionalLight(0xffe7cc, .3); rim.position.set(3, 4, -6);
scene.add(hemi, key, fill, rim);
const fibre = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d'); const im = g.createImageData(512, 512);
  // fine tooth: tiny, even grain, the kind you feel more than see
  for (let i = 0; i < im.data.length; i += 4) { const n = (Math.random() - .5) * 5; im.data[i] = 253 + n; im.data[i + 1] = 251 + n; im.data[i + 2] = 245 + n; im.data[i + 3] = 255; }
  g.putImageData(im, 0, 0);
  // a whisper of uneven pulp, only ever lighter, never stains
  for (let k = 0; k < 14; k++) { const x = Math.random() * 512, y = Math.random() * 512, r = 70 + Math.random() * 120, gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, 'rgba(255,255,252,.10)'); gr.addColorStop(1, 'rgba(255,255,252,0)'); g.fillStyle = gr; g.fillRect(x - r, y - r, 2 * r, 2 * r); }
  // short, pale fibres laid mostly one way, like a real sheet's grain
  g.lineCap = 'round';
  for (let k = 0; k < 520; k++) { const x = Math.random() * 512, y = Math.random() * 512, a = (Math.random() - .5) * .9, l = 5 + Math.random() * 12;
    g.strokeStyle = `rgba(170,160,135,${.025 + Math.random() * .035})`; g.lineWidth = .4 + Math.random() * .4;
    g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + Math.cos(a) * l / 2, y + Math.sin(a) * l / 2 + (Math.random() - .5) * 2, x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke(); }
  // ruled like a notebook: faint blue rules only
  for (let k = 1; k < 15; k++) { const x = Math.round(k * 512 / 15) + .5; g.strokeStyle = 'rgba(96,130,200,.32)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 512); g.stroke(); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; t.encoding = THREE.sRGBEncoding; t.anisotropy = 8; return t; })();
const PAPER = { t: 0, amp: 0 };
const paperMat = new THREE.MeshStandardMaterial({ color: 0xf4f1ea, map: fibre, emissiveMap: fibre, roughness: 1, metalness: 0, side: THREE.DoubleSide, flatShading: true, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
const edgeMat = new THREE.LineBasicMaterial({ color: 0x9a968d, transparent: true, opacity: .45 });

/* --- 2D helpers (rigid transforms as [a,b,c,d,e,f]: x' = a x + c y + e, y' = b x + d y + f) --- */
const I = [1, 0, 0, 1, 0, 0];
const ap = (m, p) => [m[0] * p[0] + m[2] * p[1] + m[4], m[1] * p[0] + m[3] * p[1] + m[5]];
const mul = (m, n) => [m[0]*n[0]+m[2]*n[1], m[1]*n[0]+m[3]*n[1], m[0]*n[2]+m[2]*n[3], m[1]*n[2]+m[3]*n[3], m[0]*n[4]+m[2]*n[5]+m[4], m[1]*n[4]+m[3]*n[5]+m[5]];
const inv = m => { const det = m[0]*m[3]-m[1]*m[2]; const a = m[3]/det, b = -m[1]/det, c = -m[2]/det, d = m[0]/det; return [a, b, c, d, -(a*m[4]+c*m[5]), -(b*m[4]+d*m[5])]; };
function reflect(A, d) { // reflection across line through A with unit dir d
  const [dx, dy] = d, a = dx*dx - dy*dy, b = 2*dx*dy;
  const R = [a, b, b, -a, 0, 0];
  const t1 = [1, 0, 0, 1, -A[0], -A[1]], t2 = [1, 0, 0, 1, A[0], A[1]];
  return mul(t2, mul(R, t1));
}
const side = (A, d, p) => d[0] * (p[1] - A[1]) - d[1] * (p[0] - A[0]); // >0 left of line
function clip(poly, A, d, keepLeft) {
  const out = [], s = p => keepLeft ? side(A, d, p) : -side(A, d, p);
  for (let i = 0; i < poly.length; i++) {
    const P = poly[i], Q = poly[(i + 1) % poly.length], sp = s(P), sq = s(Q);
    if (sp >= 0) out.push(P);
    if ((sp >= 0) !== (sq >= 0)) { const t = sp / (sp - sq); out.push([P[0] + (Q[0]-P[0]) * t, P[1] + (Q[1]-P[1]) * t]); }
  }
  return out.length >= 3 ? out : null;
}
const unit = (x, y) => { const l = Math.hypot(x, y); return [x / l, y / l]; };

/* sheet: 2 × 2.8 (A-series ratio), nose at top */
const HW = 1, HH = 1.414;
const FLAT = [ // flat folds, applied in sequence; crease line in the current folded state
  { A: [0, HH], d: unit(-1, -1), mover: [-.9, HH - .05] },
  { A: [0, HH], d: unit(1, -1),  mover: [.9, HH - .05] },
  { A: [0, HH], d: unit(-Math.sin(Math.PI/8), -Math.cos(Math.PI/8)), mover: [-.9, .1] },
  { A: [0, HH], d: unit(Math.sin(Math.PI/8), -Math.cos(Math.PI/8)),  mover: [.9, .1] },
];
const WING = { L: { A: [-.035, HH], d: unit(-.30, -2*HH) }, R: { A: [.035, HH], d: unit(.30, -2*HH) } };

let regions = [{ poly: [[-HW,-HH],[HW,-HH],[HW,HH],[-HW,HH]], T: I, z: 0, hist: [] }];
FLAT.forEach((f, k) => {
  const zmax = Math.max(...regions.map(r => r.z)), next = [];
  const moverLeft = side(f.A, f.d, f.mover) > 0;
  for (const r of regions) {
    const Ti = inv(r.T), cur = r.poly.map(p => ap(r.T, p));
    for (const left of [true, false]) {
      const piece = clip(cur, f.A, f.d, left); if (!piece) continue;
      const moving = left === moverLeft;
      next.push({ poly: piece.map(p => ap(Ti, p)), T: moving ? mul(reflect(f.A, f.d), r.T) : r.T,
                  z: moving ? 2 * zmax - r.z + .006 : r.z, hist: [...r.hist, { T: r.T, z: r.z, moving }] });
    }
  }
  regions = next;
});
// hinge membership in the final flat state: half (L/R) and wing
{
  const next = [];
  for (const r of regions) {
    const Ti = inv(r.T), cur = r.poly.map(p => ap(r.T, p));
    for (const left of [true, false]) {
      const half = clip(cur, [0, 0], [0, 1], left); if (!half) continue; // left of upward line = x<0
      const W = left ? WING.L : WING.R;
      // wing side: away from the centre
      const wingLeft = left ? side(W.A, W.d, [-1, 0]) > 0 : side(W.A, W.d, [1, 0]) > 0;
      for (const wl of [true, false]) {
        const piece = clip(half, W.A, W.d, wl); if (!piece) continue;
        next.push({ ...r, poly: piece.map(p => ap(Ti, p)), half: left ? -1 : 1, wing: wl === wingLeft });
      }
    }
  }
  regions = next;
}
// fan-triangulate, then subdivide so the sheet can bend smoothly when rolled
const TRI = [];
function subdiv(a, b, c, reg, depth) {
  const L = Math.max(Math.hypot(a[0]-b[0], a[1]-b[1]), Math.hypot(b[0]-c[0], b[1]-c[1]), Math.hypot(c[0]-a[0], c[1]-a[1]));
  if (L < .16 || depth > 7) { TRI.push([a, b, c, reg]); return; }
  const ab = [(a[0]+b[0])/2, (a[1]+b[1])/2], bc = [(b[0]+c[0])/2, (b[1]+c[1])/2], ca = [(c[0]+a[0])/2, (c[1]+a[1])/2];
  subdiv(a, ab, ca, reg, depth + 1); subdiv(ab, b, bc, reg, depth + 1); subdiv(ca, bc, c, reg, depth + 1); subdiv(ab, bc, ca, reg, depth + 1);
}
regions.forEach((r, i) => { for (let j = 1; j < r.poly.length - 1; j++) subdiv(r.poly[0], r.poly[j], r.poly[j + 1], i, 0); });
const NV = TRI.length * 3;
const ORIG = new Float32Array(NV * 2), REG = new Uint16Array(NV);
TRI.forEach((t, i) => { for (let k = 0; k < 3; k++) { ORIG[(i*3+k)*2] = t[k][0]; ORIG[(i*3+k)*2+1] = t[k][1]; REG[i*3+k] = t[3]; } });
const geo = new THREE.BufferGeometry();
const POS = new Float32Array(NV * 3), UV = new Float32Array(NV * 2);
for (let i = 0; i < NV; i++) { UV[i*2] = (ORIG[i*2] + HW) / (2 * HW); UV[i*2+1] = (ORIG[i*2+1] + HH) / (2 * HH); }
geo.setAttribute('position', new THREE.BufferAttribute(POS, 3));
geo.setAttribute('uv', new THREE.BufferAttribute(UV, 2));
const sheet = new THREE.Mesh(geo, paperMat);

// rotation about an in-plane axis through A (z=0) with unit dir d
function rot(out, A, d, ang) {
  const x = out[0] - A[0], y = out[1] - A[1], z = out[2];
  const c = Math.cos(ang), s = Math.sin(ang), dx = d[0], dy = d[1];
  const dot = dx * x + dy * y;
  // d × v with d=(dx,dy,0)
  const cx = dy * z, cy = -dx * z, cz = dx * y - dy * x;
  out[0] = x * c + cx * s + dx * dot * (1 - c) + A[0];
  out[1] = y * c + cy * s + dy * dot * (1 - c) + A[1];
  out[2] = z * c + cz * s;
}
// direction so the moving flap lifts toward +z (the viewer)
const lift = (A, d, mover) => (d[0] * (mover[1] - A[1]) - d[1] * (mover[0] - A[0])) > 0 ? 1 : -1;
FLAT.forEach(f => f.sgn = lift(f.A, f.d, f.mover));
const CEN = { A: [0, 0], d: [0, 1] };
const sgnHalfL = lift(CEN.A, CEN.d, [-1, 0]), sgnHalfR = lift(CEN.A, CEN.d, [1, 0]);
const sgnWingL = -lift(WING.L.A, WING.L.d, [-1, 0]), sgnWingR = -lift(WING.R.A, WING.R.d, [1, 0]);

const v = [0, 0, 0];
// edge list: every region outline, so folded flaps show their paper edges
const EDGES = [];
const onRim = (a, b) => (Math.abs(Math.abs(a[0]) - HW) < 1e-4 && Math.abs(a[0] - b[0]) < 1e-4) || (Math.abs(Math.abs(a[1]) - HH) < 1e-4 && Math.abs(a[1] - b[1]) < 1e-4);
regions.forEach((r, i) => r.poly.forEach((a, j) => { const b = r.poly[(j + 1) % r.poly.length]; if (onRim(a, b)) EDGES.push(a[0], a[1], b[0], b[1], i); }));
const NE = EDGES.length / 5;
const EPOS = new Float32Array(NE * 6);
const egeo = new THREE.BufferGeometry(); egeo.setAttribute('position', new THREE.BufferAttribute(EPOS, 3));
const edges = new THREE.LineSegments(egeo, edgeMat);

let S = { kf: 0, tf: 0, h: 0, kk: 0, roll: 0, curl: 0 };
function place(px, py, r) {
  if (S.roll > 0) {
    const k = S.kk;
    if (k < 1e-4) { v[0] = px; v[1] = py; v[2] = 0; }
    else { v[0] = Math.sin(k * px) / k; v[1] = py; v[2] = -(1 - Math.cos(k * px)) / k; }
    return;
  }
  const NF = FLAT.length;
  if (S.h > 0 || S.kf >= NF) {
    const q = ap(r.T, [px, py]); v[0] = q[0]; v[1] = q[1]; v[2] = r.z;
    if (S.h > 0) {
      const L = r.half < 0;
      if (r.wing) { const W = L ? WING.L : WING.R, dist = Math.abs(W.d[0] * (v[1] - W.A[1]) - W.d[1] * (v[0] - W.A[0]));
        rot(v, W.A, W.d, (L ? sgnWingL : sgnWingR) * S.h * 1.32 * (1 - .12 * Math.min(1, dist / .9) * (1 - S.h))); }
      rot(v, CEN.A, CEN.d, (L ? sgnHalfL : sgnHalfR) * S.h * 1.45);
    }
  } else {
    const st = r.hist[S.kf], q = ap(st.T, [px, py]); v[0] = q[0]; v[1] = q[1]; v[2] = st.z;
    if (st.moving && S.tf > 0) {
      const F = FLAT[S.kf], dist = Math.abs(F.d[0] * (v[1] - F.A[1]) - F.d[1] * (v[0] - F.A[0]));
      const lag = .26 * Math.sin(Math.PI * S.tf) * Math.min(1, dist / 1.1);
      rot(v, F.A, F.d, F.sgn * S.tf * Math.PI * (1 - lag));
    }
  }
  // real paper is never perfectly flat: a soft curl that relaxes as it's folded
  if (S.curl > 0) v[2] += S.curl * (.06 * (v[0] * v[0]) - .03 * Math.cos(v[1] * 1.6));
  // real paper isn't still: a slow, shallow ripple runs across it while it lies flat
  if (typeof PAPER !== 'undefined' && PAPER.amp > 0 && S.roll === 0 && S.h === 0) v[2] += PAPER.amp * Math.sin(v[0] * 1.6 + PAPER.t * .8) * Math.cos(v[1] * 1.05 - PAPER.t * .55);
}
/* f ∈ [0,4]: flat folds; h ∈ [0,1]: keel+wings; roll ∈ [0,1] */
function shapeSheet(f, h, roll, curl) {
  const kf = Math.min(Math.floor(f), FLAT.length);
  S = { kf, tf: f - kf, h, roll, kk: roll * Math.PI * 1.04, curl };
  for (let i = 0; i < NV; i++) {
    place(ORIG[i*2], ORIG[i*2+1], regions[REG[i]]);
    POS[i*3] = v[0]; POS[i*3+1] = v[1]; POS[i*3+2] = v[2];
  }
  for (let e = 0; e < NE; e++) {
    const r = regions[EDGES[e*5+4]];
    place(EDGES[e*5], EDGES[e*5+1], r); EPOS[e*6] = v[0]; EPOS[e*6+1] = v[1]; EPOS[e*6+2] = v[2];
    place(EDGES[e*5+2], EDGES[e*5+3], r); EPOS[e*6+3] = v[0]; EPOS[e*6+4] = v[1]; EPOS[e*6+5] = v[2];
  }
  geo.attributes.position.needsUpdate = true; geo.computeVertexNormals(); geo.computeBoundingSphere();
  egeo.attributes.position.needsUpdate = true; egeo.computeBoundingSphere();
  edges.visible = roll < .02;
}

/* ---------------- rocket parts ---------------- */
const R0 = 1 / (Math.PI * 1.04) * 1.0; // tube radius after rolling
const tubeZ = -R0;
// ogive nose, engine bell, interstage bands, swept fins: a launch vehicle, not a toy
const metal = new THREE.MeshStandardMaterial({ color: 0x2a2b30, roughness: .45, metalness: .75, side: THREE.DoubleSide });
const bandMat = new THREE.MeshStandardMaterial({ color: 0x1b1c20, roughness: .7, metalness: .2, side: THREE.DoubleSide });
const ogive = []; for (let i = 0; i <= 24; i++) { const t = i / 24; ogive.push(new THREE.Vector2(R0 * 1.012 * Math.sqrt(1 - t * t) * (1 - .04 * t), t * 1.05)); }
const cone = new THREE.Mesh(new THREE.LatheGeometry(ogive, 48), paperMat);
const bell = []; for (let i = 0; i <= 16; i++) { const t = i / 16; bell.push(new THREE.Vector2(R0 * (.34 + .5 * Math.pow(t, 1.6)), -t * .34)); }
const nozzle = new THREE.Mesh(new THREE.LatheGeometry(bell, 40), metal);
nozzle.position.set(0, -HH + .005, tubeZ);
const bands = new THREE.Group();
[[HH - .02, .05], [-.08, .035], [-HH + .06, .06]].forEach(([y, hgt]) => {
  const b = new THREE.Mesh(new THREE.CylinderGeometry(R0 * 1.012, R0 * 1.012, hgt, 48, 1, true), bandMat); b.position.y = y; bands.add(b);
});
bands.position.set(0, 0, tubeZ);
const fins = new THREE.Group();
const finShape = new THREE.Shape(); finShape.moveTo(0, .34); finShape.lineTo(.26, -.02); finShape.lineTo(.26, -.2); finShape.lineTo(0, -.16); finShape.lineTo(0, .34);
const finGeo = new THREE.ExtrudeGeometry(finShape, { depth: .012, bevelEnabled: false }); finGeo.translate(0, 0, -.006);
for (let i = 0; i < 4; i++) {
  const piv = new THREE.Group(); piv.rotation.y = i * Math.PI / 2 + Math.PI / 4;
  const fin = new THREE.Mesh(finGeo, bandMat); fin.position.x = R0 * .99; piv.add(fin); fins.add(piv);
}
fins.position.set(0, -HH + .22, tubeZ);

// flame + smoke
const flameOut = new THREE.Mesh(new THREE.ConeGeometry(.22, 1.5, 32, 1, true), new THREE.MeshBasicMaterial({ color: 0xff8a2b, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
const flameIn = new THREE.Mesh(new THREE.ConeGeometry(.12, .7, 32, 1, true), new THREE.MeshBasicMaterial({ color: 0xfff1c9, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
flameOut.rotation.x = Math.PI; flameIn.rotation.x = Math.PI;
flameOut.position.set(0, -HH - .34 - .75, tubeZ); flameIn.position.set(0, -HH - .34 - .35, tubeZ);
const glow = new THREE.PointLight(0xff9a3c, 0, 4); glow.position.set(0, -HH - .3, tubeZ);

const smokeTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.5, 'rgba(255,255,255,.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c); })();
const PUFFS = 70, puffs = [];
const smoke = new THREE.Group();
for (let i = 0; i < PUFFS; i++) {
  const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: smokeTex, color: 0xbfbfc4, transparent: true, opacity: 0, depthWrite: false }));
  m.visible = false; smoke.add(m); puffs.push({ s: m, life: 0, vx: 0, vy: 0, sz: 0 });
}

const craft = new THREE.Group();       // flight / launch transform
const pitch = new THREE.Group();       // pitch over into flight attitude
const body = new THREE.Group();        // holds the sheet & rocket parts in paper coordinates
body.add(sheet, edges, cone, nozzle, bands, fins, flameOut, flameIn, glow);
pitch.add(body); craft.add(pitch); scene.add(craft, smoke);
cone.position.set(0, HH, tubeZ);



/* choreography */
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const seg = (p, a, b) => ease(clamp((p - a) / (b - a)));
let anchor = { x: 0, y: 0, s: 1 }, home = anchor, heroA = anchor, VW = 1, VH = 1;
function layout() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  VH = 2 * Math.tan(camera.fov * Math.PI / 360) * camera.position.z; VW = VH * camera.aspect;
  const X = px => (px / w - .5) * VW, Y = py => (.5 - py / h) * VH;
  const margin = (w - 828) / 2;
  const top = $('h1').getBoundingClientRect().top + scrollY - 84;
  const bot = document.querySelector('.lede').getBoundingClientRect().bottom + scrollY + 84;
  // the sheet frames the words themselves: from the left of the text to the end of its longest line
  const lr = document.querySelector('.lede').getBoundingClientRect(), hr = $('h1').getBoundingClientRect();
  const left = Math.max(6, hr.left - 104), right = Math.min(w - 6, Math.max(lr.right, hr.left + 520) + 104);
  const padW = right - left, padH = bot - top;
  const sh = Math.max((padW / w * VW) / (2 * HH), (padH / h * VH) / (2 * HW));
  heroA = { x: X((left + right) / 2), y: Y((top + bot) / 2), s: sh };
  // the shadow matches the sheet's footprint on the page (landscape: width = 2·HH·s, height = 2·HW·s in world units)
  const pw = 2 * HH * sh / VW * w, ph = 2 * HW * sh / VH * h, cxp = (left + right) / 2, cyp = (top + bot) / 2;
  const sl = Math.max(0, cxp - pw / 2 + 4), sr = Math.min(w, cxp + pw / 2 - 4);
  Object.assign($('sheetShade').style, { left: sl + 'px', top: (cyp - ph / 2 + 4) + 'px', width: Math.max(0, sr - sl) + 'px', height: (ph - 8) + 'px' });
  if (margin > 200) {
    const cx = w - margin / 2, marginW = margin / w * VW;
    home = { x: X(cx), y: -VH * .2, s: Math.min(.54, (VH * .378) / 2.9, marginW * .432) };
  } else home = { x: VW * .5 - .48, y: -VH * .5 + .62, s: .19 };
  sizeSky();
  if (typeof astroLayout === 'function' && ASTRO_READY) astroLayout();
}
let ASTRO_READY = false;
layout(); addEventListener('resize', layout);
document.fonts && document.fonts.ready.then(layout);

let P = 0, launchT = -1, reborn = 1, sounded = false;
function pose(p, time, k) {
  let f = 0, h = 0, roll = 0;
  if (p < .5) { f = clamp((p - .1) / (.22 - .1)) * 4; h = seg(p, .22, .29); }
  else { const u = 1 - seg(p, .5, .58); h = clamp(u * 2 - 1); f = clamp(u * 2) * 4; if (u <= 0) f = 0; }
  const fk = Math.floor(f), ft = f - fk; f = fk + ease(ft);
  if (p >= .58) roll = seg(p, .58, .68);
  const curl = p < .1 ? .3 + .7 * k : p < .5 ? 1 - seg(p, .1, .17) : 0;
  shapeSheet(f, h, roll, curl);
  const g = clamp((p - .3) / (.5 - .3)), flying = p > .3 && p < .5;
  let fx = 0, fy = 0, fz = 0;
  pitch.rotation.x = 0; pitch.rotation.y = 0;
  if (flying) {
    const th = ease(g) * Math.PI * 2, rx = Math.abs(home.x) || VW * .3, ry = Math.min(VH * .3, rx * .6), sg = Math.sign(home.x || 1);
    fx = (Math.cos(th) - 1) * rx * sg; fy = Math.sin(th) * ry; fz = Math.sin(th / 2) * 1.2;
    const tx = -Math.sin(th) * rx * sg, ty = Math.cos(th) * ry;
    craft.rotation.order = 'ZYX';
    craft.rotation.z = Math.atan2(ty, tx) - Math.PI / 2;
    craft.rotation.y = Math.sin(th) * .55;
    craft.rotation.x = -.35;
  } else {
    craft.rotation.order = 'YXZ';
    craft.rotation.y = (p < .3 ? (Math.sin(time * .4) * .14 - .3) * k : 0) + (p > .5 && p < .6 ? -.25 * (1 - seg(p, .54, .6)) : 0);
    craft.rotation.z = (-Math.PI / 2) * (1 - k);
    craft.rotation.x = p < .3 ? (-.14 + Math.sin(time * .6) * .025) * k : 0;
  }
  const asm = seg(p, .68, .78);
  cone.visible = asm > 0; cone.position.y = HH + (1 - asm) * 2.2;
  nozzle.visible = asm > 0; nozzle.position.y = -HH + .005 - (1 - asm) * 1.6;
  const bnd = seg(p, .73, .8); bands.visible = bnd > 0; bands.children.forEach(b => b.scale.set(1, Math.max(.001, bnd), 1));
  fins.visible = asm > 0;
  fins.children.forEach((pv, i) => { const a = clamp(asm * 1.6 - i * .18); pv.children[0].position.x = R0 * .99 + (1 - ease(a)) * 1.2; pv.children[0].visible = a > 0; });
  if (p > .68 && launchT < 0) pitch.rotation.y = Math.sin(time * .3) * .3;
  return { asm, fx, fy, fz, flying };
}
const clockT = new THREE.Clock();
let tPrev = 0;
/* ───────────── by night: an astronaut drifts down the page and boards his ship at the very end ───────────── */
// space light for reflections: black sky, a hard sun, a blue planet glow along the bottom
const spaceEnv = (() => {
  const c = document.createElement('canvas'); c.width = 512; c.height = 256; const g = c.getContext('2d');
  const sky = g.createLinearGradient(0, 0, 0, 256); sky.addColorStop(0, '#04050b'); sky.addColorStop(.6, '#0b1236'); sky.addColorStop(.8, '#3a6cd0'); sky.addColorStop(1, '#0b1a40');
  g.fillStyle = sky; g.fillRect(0, 0, 512, 256);
  const sun = g.createRadialGradient(140, 64, 0, 140, 64, 52); sun.addColorStop(0, '#ffffff'); sun.addColorStop(.3, '#fff2d6'); sun.addColorStop(1, 'rgba(255,240,210,0)');
  g.fillStyle = sun; g.fillRect(70, 0, 150, 130);
  const fill = g.createRadialGradient(380, 90, 0, 380, 90, 70); fill.addColorStop(0, 'rgba(160,190,255,.7)'); fill.addColorStop(1, 'rgba(160,190,255,0)');
  g.fillStyle = fill; g.fillRect(300, 10, 160, 160);
  const t = new THREE.CanvasTexture(c); t.mapping = THREE.EquirectangularReflectionMapping; t.encoding = THREE.sRGBEncoding;
  const pm = new THREE.PMREMGenerator(renderer); const env = pm.fromEquirectangular(t).texture; pm.dispose(); return env;
})();
const AM = (color, rough, metal = 0, extra = {}) => new THREE.MeshStandardMaterial(Object.assign({ color, roughness: rough, metalness: metal, envMap: spaceEnv, envMapIntensity: .45, transparent: true }, extra));
const aSuit = AM(0xe9e6de, .6), aSeam = AM(0xc9c5bb, .66), aBand = AM(0xe0921f, .5), aPad = AM(0x8f9299, .72), aDark = AM(0x2a2c33, .5, .25),
  aVisor = AM(0x0a1838, .03, .95, { envMapIntensity: 2.4, emissive: 0x06112b, emissiveIntensity: .15 }), aMetal = AM(0xb9bdc6, .3, .85), aHose = AM(0xece9e2, .5), aGlint = new THREE.MeshBasicMaterial({ color: 0x9fd0ff, transparent: true, opacity: .85 });
// India patch: tricolour, chakra, and the word
const flagTex = (() => {
  const c = document.createElement('canvas'); c.width = 128; c.height = 112; const g = c.getContext('2d');
  g.fillStyle = '#f3f1eb'; g.fillRect(0, 0, 128, 112);
  g.fillStyle = '#ff9933'; g.fillRect(14, 10, 100, 22); g.fillStyle = '#ffffff'; g.fillRect(14, 32, 100, 22); g.fillStyle = '#138808'; g.fillRect(14, 54, 100, 22);
  g.strokeStyle = '#000080'; g.lineWidth = 1.6; g.beginPath(); g.arc(64, 43, 8.5, 0, 6.283); g.stroke();
  for (let i = 0; i < 24; i++) { const a = i / 24 * 6.283; g.beginPath(); g.moveTo(64, 43); g.lineTo(64 + Math.cos(a) * 8.5, 43 + Math.sin(a) * 8.5); g.lineWidth = .6; g.stroke(); }
  g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 1; g.strokeRect(14, 10, 100, 66);
  g.fillStyle = '#1b2a5a'; g.font = 'bold 22px Geist, Arial, sans-serif'; g.textAlign = 'center'; g.fillText('INDIA', 64, 102);
  const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 4; return t;
})();
const aFlag = AM(0xffffff, .7, 0, { map: flagTex, envMapIntensity: .3 });
const astroMats = [aSuit, aSeam, aBand, aPad, aDark, aVisor, aMetal, aHose, aGlint, aFlag];
const put = (parent, geo, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.set(rx, ry, rz); m.scale.set(sx, sy, sz); parent.add(m); return m; };
const aLathe = (pts, seg = 40) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg);
const tube = (pts, r, mat, parent) => put(parent, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p))), 24, r, 8, false), mat);

const astro = new THREE.Group(), astroBody = new THREE.Group(); astro.add(astroBody);
// torso: a soft, padded barrel
put(astroBody, aLathe([[0, -.42], [.26, -.4], [.33, -.25], [.35, -.02], [.34, .18], [.3, .32], [.18, .41], [0, .42]]), aSuit);
put(astroBody, new THREE.TorusGeometry(.33, .012, 6, 40), aSeam, 0, -.1, 0, Math.PI / 2);
// chest module with a fan, like the reference
const chest = new THREE.Group(); chest.position.set(0, .1, .3); chest.rotation.x = -.1; astroBody.add(chest);
put(chest, new THREE.BoxGeometry(.4, .24, .1), aSuit);
put(chest, new THREE.BoxGeometry(.38, .22, .02), aSeam, 0, 0, .052);
put(chest, new THREE.CylinderGeometry(.065, .065, .03, 28), aSeam, .1, 0, .06, Math.PI / 2);
put(chest, new THREE.TorusGeometry(.055, .009, 8, 28), aDark, .1, 0, .075);
for (let k = 0; k < 6; k++) put(chest, new THREE.BoxGeometry(.006, .045, .01), aDark, .1, 0, .074, 0, 0, k * Math.PI / 6);
for (let k = 0; k < 5; k++) put(chest, new THREE.BoxGeometry(.07, .008, .01), aDark, -.1, .055 - k * .022, .065);
put(chest, new THREE.BoxGeometry(.03, .1, .02), aSeam, -.17, .03, .06);
// belt with hose connectors
put(astroBody, new THREE.TorusGeometry(.33, .028, 10, 40), aSeam, 0, -.12, 0, Math.PI / 2);
for (let k = 0; k < 4; k++) put(astroBody, new THREE.TorusGeometry(.035, .016, 8, 16), aDark, -.12 + k * .08, -.12, .33, 0, 0, 0);
// hoses from the belt round to the backpack
tube([[-.2, -.13, .33], [-.36, -.2, .22], [-.42, -.05, -.05], [-.3, .15, -.3]], .022, aHose, astroBody);
tube([[.2, -.13, .33], [.37, -.22, .2], [.42, -.02, -.08], [.3, .18, -.3]], .022, aHose, astroBody);
// neck ring and helmet: white shell, big dark visor with two soft highlights
put(astroBody, new THREE.TorusGeometry(.2, .04, 12, 40), aSeam, 0, .44, 0, Math.PI / 2);
const helmet = new THREE.Group(); helmet.position.set(0, .7, 0); astroBody.add(helmet);
put(helmet, new THREE.SphereGeometry(.3, 48, 32), aSuit);
put(helmet, new THREE.SphereGeometry(.307, 64, 40, Math.PI * .5 - Math.PI * .6, Math.PI * 1.2, Math.PI * .1, Math.PI * .7), aVisor, 0, -.01, 0);
put(helmet, new THREE.TorusGeometry(.262, .022, 12, 64, Math.PI * 2), aSuit, 0, -.012, .155, 0, 0, 0, 1.05, 1.13, 1);

const glintA = put(helmet, new THREE.SphereGeometry(.05, 16, 12), aGlint, -.12, .1, .286, 0, 0, 0, 1, 1.5, .2);
put(helmet, new THREE.SphereGeometry(.02, 12, 10), aGlint, -.03, .14, .3, 0, 0, 0, 1, 1, .2);
put(helmet, new THREE.TorusGeometry(.2, .006, 6, 40, Math.PI * .45), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .3 }), 0, -.02, .23, 0, 0, Math.PI * 1.12);
for (const sx of [-1, 1]) { const ear = put(helmet, new THREE.CylinderGeometry(.075, .075, .07, 28), aSuit, sx * .29, 0, 0, 0, 0, Math.PI / 2); put(helmet, new THREE.TorusGeometry(.07, .012, 8, 28), aBand, sx * .32, 0, 0, 0, Math.PI / 2, 0); }
put(helmet, new THREE.BoxGeometry(.05, .03, .14), aSeam, 0, .29, .02);
// life-support backpack with amber side panels
put(astroBody, new THREE.BoxGeometry(.56, .66, .26), aSuit, 0, .1, -.34);
put(astroBody, new THREE.BoxGeometry(.03, .5, .2), aBand, -.29, .1, -.34); put(astroBody, new THREE.BoxGeometry(.03, .5, .2), aBand, .29, .1, -.34);
put(astroBody, new THREE.BoxGeometry(.46, .1, .05), aSeam, 0, -.12, -.48);
put(astroBody, new THREE.CylinderGeometry(.03, .03, .38, 12), aMetal, .32, .52, -.3, .3, 0, 0);
// limbs: padded segments, amber bands, grey knee pads, gloves with grey fingertips
function aLimb(x, y, z, r1, r2, l1, l2, isLeg) {
  const root = new THREE.Group(); root.position.set(x, y, z); astroBody.add(root);
  put(root, new THREE.SphereGeometry(r1 * 1.1, 20, 14), aSuit);
  const up = new THREE.Group(); root.add(up);
  put(up, new THREE.CylinderGeometry(r1, r1 * .93, l1, 22), aSuit, 0, -l1 / 2, 0);
  put(up, new THREE.CylinderGeometry(r1 * 1.04, r1 * 1.04, l1 * .2, 22), aBand, 0, isLeg ? -l1 * .3 : -l1 * .28, 0);
  const joint = new THREE.Group(); joint.position.y = -l1; up.add(joint);
  put(joint, new THREE.SphereGeometry(r1 * .97, 20, 14), aSuit);
  if (isLeg) put(joint, new THREE.SphereGeometry(r1 * .72, 18, 12), aPad, 0, 0, r1 * .62, 0, 0, 0, 1, 1.1, .45);
  const low = new THREE.Group(); joint.add(low);
  put(low, new THREE.CylinderGeometry(r2, r2 * .96, l2, 22), aSuit, 0, -l2 / 2, 0);
  for (let k = 1; k < 3; k++) put(low, new THREE.TorusGeometry(r2 * .99, .008, 6, 22), aSeam, 0, -l2 * k / 3, 0, Math.PI / 2);
  const hand = new THREE.Group(); hand.position.y = -l2 - .02; low.add(hand);
  if (isLeg) {
    put(hand, new THREE.BoxGeometry(.17, .14, .27), aSuit, 0, -.05, .04);
    put(hand, new THREE.BoxGeometry(.18, .04, .29), aPad, 0, -.13, .045);
  } else {
    put(hand, new THREE.SphereGeometry(.105, 22, 16), aSuit, 0, -.06, 0, 0, 0, 0, 1, 1.1, .8);
    put(hand, new THREE.CylinderGeometry(.11, .1, .06, 20), aSeam, 0, .03, 0);
    for (let f = 0; f < 4; f++) put(hand, new THREE.SphereGeometry(.031, 12, 10), aPad, -.066 + f * .044, -.165, .015, 0, 0, 0, 1, 1.5, 1);
    put(hand, new THREE.SphereGeometry(.032, 12, 10), aPad, .09, -.085, .045, 0, 0, 0, 1, 1.4, 1);
  }
  return { root, up, low };
}
const armL = aLimb(-.44, .26, 0, .135, .12, .3, .27, false), armR = aLimb(.44, .26, 0, .135, .12, .3, .27, false);
const legL = aLimb(-.16, -.4, 0, .155, .135, .4, .38, true), legR = aLimb(.16, -.4, 0, .155, .135, .4, .38, true);
// the flag patch sits on the side of the left upper arm
put(armL.up, new THREE.PlaneGeometry(.16, .14), aFlag, -.139, -.12, 0, 0, -Math.PI / 2, 0);

/* poses he moves through on the way down: right-side values, mirrored for the left ([x swing, outward, elbow/knee bend, forearm outward]) */
/* zero-gravity postures ([x swing, outward, elbow/knee bend, forearm outward]); the first is NASA's "neutral body posture" */
const POSES = {
  neutral: { aR: [-.55, .42, -.75, .1], aL: [-.5, .45, -.8, .1], lR: [-.35, .1, .75], lL: [-.3, .12, .7], body: [.1, -.35, .05] },
  spread:  { aR: [-.2, 1.05, -.35, .15], aL: [-.15, 1.0, -.4, .15], lR: [-.1, .34, .35], lL: [-.05, .36, .4], body: [.15, .4, .22] },
  drift:   { aR: [-1.0, .3, -.4, 0], aL: [.35, .38, -.6, 0], lR: [-.55, .1, .9], lL: [.2, .14, .5], body: [.2, -.85, -.1] },
  tuck:    { aR: [-1.1, .3, -1.2, 0], aL: [-1.05, .32, -1.2, 0], lR: [-1.35, .14, 1.9], lL: [-1.3, .16, 1.85], body: [.4, .6, .3] },
  reach:   { aR: [-1.5, .14, -.12, 0], aL: [-1.35, .2, -.3, 0], lR: [-.2, .08, .55], lL: [-.35, .1, .75], body: [-.1, -1.0, 0] },
};
const PATH_POSES = [[0, 'neutral'], [.22, 'spread'], [.44, 'drift'], [.64, 'tuck'], [.82, 'neutral'], [.93, 'reach']];
const mixPose = u => {
  let i = 0; while (i < PATH_POSES.length - 1 && u > PATH_POSES[i + 1][0]) i++;
  const [u0, a] = PATH_POSES[i], [u1, b] = PATH_POSES[Math.min(i + 1, PATH_POSES.length - 1)];
  const k = u1 > u0 ? ease(clamp((u - u0) / (u1 - u0))) : 0, A = POSES[a], B = POSES[b], out = {};
  for (const key in A) out[key] = A[key].map((v, j) => v + (B[key][j] - v) * k);
  return out;
};
function applyPose(P, t) {
  const L = (limb, v, side, leg) => {
    limb.root.rotation.x = v[0]; limb.root.rotation.z = side * v[1];
    if (leg) { limb.low.rotation.x = v[2]; limb.low.rotation.z = 0; } else { limb.low.rotation.x = v[2]; limb.low.rotation.z = side * (v[3] || 0); }
  };
  const w = Math.sin(t * .7) * .06;
  L(armR, [P.aR[0], P.aR[1], P.aR[2], P.aR[3] + w], 1, false); L(armL, P.aL, -1, false);
  L(legR, P.lR, 1, true); L(legL, P.lL, -1, true);
  helmet.rotation.set(Math.sin(t * .5) * .08, Math.sin(t * .35) * .25, 0);
}

/* a modern crew capsule on its service trunk, waiting at the very end of the page */
const ship = new THREE.Group();
const PM = (color, rough, metal, extra = {}) => new THREE.MeshPhysicalMaterial(Object.assign({ color, roughness: rough, metalness: metal, envMap: spaceEnv, envMapIntensity: .55, transparent: true, clearcoat: .7, clearcoatRoughness: .25 }, extra));
const cellTex = (() => {
  const c = document.createElement('canvas'); c.width = 256; c.height = 64; const g = c.getContext('2d');
  g.fillStyle = '#0f1a3d'; g.fillRect(0, 0, 256, 64);
  for (let x = 0; x < 256; x += 16) for (let y = 0; y < 64; y += 16) { const v = 30 + Math.random() * 14; g.fillStyle = `rgb(${v * .5},${v * .8},${v * 2.2})`; g.fillRect(x + 1, y + 1, 14, 14); }
  g.strokeStyle = 'rgba(170,190,240,.35)'; g.lineWidth = 1; for (let x = 0; x <= 256; x += 16) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 64); g.stroke(); }
  const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.wrapS = THREE.RepeatWrapping; t.repeat.set(3, 1); return t;
})();
const sHull = PM(0xe7eaef, .38, .12), sBlack = AM(0x121317, .42, .35), sTrim = AM(0x9ea6b6, .25, .9), sSolar = PM(0x2b3f86, .22, .5, { map: cellTex, clearcoat: 1, clearcoatRoughness: .08, envMapIntensity: 1.2 }),
  sWin = AM(0x070b18, .04, .7, { emissive: 0xffc27a, emissiveIntensity: 0, envMapIntensity: 1.8 }), sHole = AM(0x020203, 1),
  sRed = new THREE.MeshBasicMaterial({ color: 0xff3b30, transparent: true }), sGreen = new THREE.MeshBasicMaterial({ color: 0x32d74b, transparent: true });
// capsule: one smooth pearl-white shell, a glossy black heat shield and a thin cobalt accent
sHull.color.setHex(0xf2f4f7); sHull.roughness = .22; sHull.clearcoat = 1; sHull.clearcoatRoughness = .06; sHull.envMapIntensity = .8;
sBlack.roughness = .25;
const sAccent = PM(0x2f54ff, .3, .3, { emissive: 0x2a46ff, emissiveIntensity: .35 }), sGlow = new THREE.MeshBasicMaterial({ color: 0x9db6ff, transparent: true, opacity: .8 });
const coneR = y => 1.0 - (y + .18) * (.42 / .7);
put(ship, aLathe([[0, -.4], [.96, -.4], [1.03, -.37], [1.045, -.3], [1.02, -.22], [.98, -.18], [.58, .52], [.53, .58], [.45, .625], [.32, .655], [0, .66]], 128), sHull);
put(ship, aLathe([[0, -.47], [.96, -.47], [1.03, -.44], [1.05, -.39], [1.0, -.4], [0, -.4]], 128), sBlack);
put(ship, aLathe([[coneR(-.16) + .006, -.16], [coneR(-.125) + .006, -.125]], 128), sAccent);
// a wraparound window band, interrupted by the hatch
{ const band = (y0, y1, o, mat, gap) => { const g = new THREE.LatheGeometry([new THREE.Vector2(coneR(y0) + o, y0), new THREE.Vector2(coneR(y1) + o, y1)], 128, gap, Math.PI * 2 - gap * 2); return put(ship, g, mat); };
  band(.235, .375, .006, sBlack, .5); const w = band(.255, .355, .01, sWin, .54); w.material.side = THREE.DoubleSide; }
// docking ring under a nose cone that's hinged open
put(ship, new THREE.TorusGeometry(.28, .03, 12, 48), sTrim, 0, .64, 0, Math.PI / 2);
put(ship, new THREE.CylinderGeometry(.27, .29, .05, 48), sBlack, 0, .645, 0);
const nosePivot = new THREE.Group(); nosePivot.position.set(0, .66, .32); ship.add(nosePivot);
put(nosePivot, aLathe([[0, 0], [.36, 0], [.33, .05], [.2, .1], [0, .11]], 64), sHull, 0, 0, -.32);
nosePivot.rotation.x = .16;
// windows: dark glass in black frames, sitting on the cone's surface
const wins = [];
const winAt = (a, y, sc = 1) => {
  const r = 1.0 - (y + .18) * (.42 / .7) + .012, px = Math.sin(a) * r, pz = Math.cos(a) * r;
  const g = new THREE.Group(); g.position.set(px, y, pz); g.lookAt(px + Math.sin(a), y + .6, pz + Math.cos(a)); ship.add(g);
  put(g, new THREE.CircleGeometry(.075 * sc, 32), sBlack, 0, 0, -.002, 0, 0, 0, 1.25, 1, 1);
  const w = put(g, new THREE.CircleGeometry(.056 * sc, 32), sWin, 0, 0, .002, 0, 0, 0, 1.25, 1, 1); wins.push(w);
};

// side hatch with a dark frame, facing the way he comes in
const hatchGroup = new THREE.Group(); { const a = 0, y = .1, r = 1.0 - (y + .18) * (.42 / .7) + .01; hatchGroup.position.set(0, y, r); hatchGroup.lookAt(0, y + .6, r + 1); ship.add(hatchGroup); }
put(hatchGroup, new THREE.PlaneGeometry(.6, .64), sBlack, 0, 0, -.001);
const hatchHole = put(hatchGroup, new THREE.PlaneGeometry(.5, .54), sHole, 0, 0, .001);
const hatchPivot = new THREE.Group(); hatchPivot.position.set(-.26, 0, .004); hatchGroup.add(hatchPivot);
const door = put(hatchPivot, new THREE.BoxGeometry(.52, .56, .025), sHull, .26, 0, .013);
put(hatchPivot, new THREE.BoxGeometry(.02, .14, .025), sTrim, .46, 0, .03);
[-.34, .34].forEach(x => put(hatchGroup, new THREE.TorusGeometry(.07, .01, 6, 16, Math.PI), sTrim, x, 0, .02, 0, 0, Math.PI / 2));
// a small tricolour stripe and the /अ mark beside the hatch
const markTex = (() => { const c = document.createElement('canvas'); c.width = 256; c.height = 64; const g = c.getContext('2d');
  [['#ff9933', 0], ['#ffffff', 1], ['#138808', 2]].forEach(([col, k]) => { g.fillStyle = col; g.fillRect(8 + k * 22, 18, 20, 28); });
  g.fillStyle = '#1f2f7a'; g.font = '40px "Yatra One", serif'; g.textBaseline = 'middle'; g.fillText('/अ', 86, 36);
  g.font = '600 22px Geist, Arial, sans-serif'; g.fillStyle = '#3a3f4c'; g.fillText('ABHIGGT', 150, 36);
  const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; return t; })();
{ const a = .55, y = .02, r = 1.0 - (y + .18) * (.42 / .7) + .013, g = new THREE.Group(); g.position.set(Math.sin(a) * r, y, Math.cos(a) * r); g.lookAt(g.position.x + Math.sin(a), y + .6, g.position.z + Math.cos(a)); ship.add(g);
  put(g, new THREE.PlaneGeometry(.42, .105), AM(0xffffff, .6, 0, { map: markTex, transparent: true })); }
// service trunk: a smooth skirt with flush solar panels and a soft glowing ring underneath
put(ship, new THREE.CylinderGeometry(1.0, .9, .52, 128, 1, true), sHull, 0, -.69, 0);
put(ship, new THREE.CylinderGeometry(.985, .925, .3, 128, 1, true, -1.7, 1.2), sSolar, 0, -.7, 0);
put(ship, new THREE.CylinderGeometry(.985, .925, .3, 128, 1, true, 1.35, 1.2), sSolar, 0, -.7, 0);
put(ship, new THREE.CylinderGeometry(.9, .82, .06, 96), sBlack, 0, -.98, 0);
put(ship, new THREE.TorusGeometry(.62, .018, 8, 96), sGlow, 0, -1.015, 0, Math.PI / 2);
// navigation lights, blinking
const navR = put(ship, new THREE.SphereGeometry(.025, 12, 8), sRed, -1.04, -.3, .05), navG = put(ship, new THREE.SphereGeometry(.025, 12, 8), sGreen, 1.04, -.3, .05);
const shipMats = [sHull, sBlack, sTrim, sSolar, sWin, sHole, sRed, sGreen, sAccent, sGlow];

// tether from his backpack to the hatch
const tetherPts = 40, tetherGeo = new THREE.BufferGeometry(); tetherGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(tetherPts * 3), 3));
const tether = new THREE.Line(tetherGeo, new THREE.LineBasicMaterial({ color: 0xe8ecf6, transparent: true, opacity: .8 }));
const nightG = new THREE.Group(); nightG.add(ship, astro, tether); scene.add(nightG);
const nightKey = new THREE.DirectionalLight(0xfff1dc, .72); nightKey.position.set(-5, 4, 5);
const nightRim = new THREE.DirectionalLight(0x7d96ff, .9); nightRim.position.set(5, 1, -3);
const nightAmb = new THREE.AmbientLight(0x404a70, .22);
nightG.add(nightKey, nightRim, nightAmb);

// his route: in screen fractions, so it fits any width
let ASTRO = { pts: [], s: .3, ship: { x: 0, s: .4, side: 1 } };
function astroLayout() {
  const w = innerWidth, margin = (w - 828) / 2, X = f => f * VW, Y = f => f * VH;
  if (margin > 200) {
    const mx = (w - margin / 2) / w - .5;
    ASTRO.pts = [[mx * .9, .3, 0], [mx * .78, .17, -.3], [mx * 1.02, .04, -.6], [mx * .8, -.09, -.3], [mx * .98, -.2, -.5], [mx * .9, -.28, 0]].map(([x, y, z]) => [X(x), Y(y), z]);
    ASTRO.s = Math.min(.44, (margin / w * VW) * .21);
    ASTRO.ship = { x: X(mx), s: Math.min(.7, (margin / w * VW) * .31), mobile: false };
  } else {
    const cx = VW * .5 - .3;
    ASTRO.pts = [[cx, VH * .3, -.5], [cx - .25, VH * .1, -1], [cx, -VH * .08, -.5], [cx - .15, -VH * .24, -1], [cx, -VH * .3, 0], [cx, -VH * .34, 0]];
    ASTRO.s = .15;
    ASTRO.ship = { x: VW * .5 - .36, s: .26, mobile: true };
  }
}
const catmull = (p0, p1, p2, p3, t) => { const t2 = t * t, t3 = t2 * t; return .5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3); };
function along(u) {
  const P = ASTRO.pts, n = P.length - 1, f = Math.min(n - 1e-6, Math.max(0, u * n)), i = Math.floor(f), t = f - i;
  const a = P[Math.max(0, i - 1)], b = P[i], c = P[i + 1], d = P[Math.min(n, i + 2)];
  return [0, 1, 2].map(k => catmull(a[k], b[k], c[k], d[k], t));
}
const setOpacity = (mats, o) => mats.forEach(m => { m.opacity = o; m.depthWrite = o > .98; });
const hatchWorld = new THREE.Vector3(), packWorld = new THREE.Vector3(), hatchN = new THREE.Vector3(), vTmp = new THREE.Vector3(), vDown = new THREE.Vector3(0, -1, 0), AS = {};
const qPose = new THREE.Quaternion(), qAlign = new THREE.Quaternion(), eTmp = new THREE.Euler();
let mixer = null;
const footEl = document.querySelector('footer'), kidEl = document.getElementById('kidLine');
const GRAB = { on: false, x: 0, y: 0, left: 0, free: false, taps: [], hist: [] }, aV = new THREE.Vector3();
const toWorld = (cx, cy) => [(cx / innerWidth - .5) * VW, (.5 - cy / innerHeight) * VH];
const nearAstro = (cx, cy) => { if (!darkNow() || !astro.visible || AS.x === undefined) return false; aV.copy(astro.position).project(camera);
  const sx = (aV.x + 1) / 2 * innerWidth, sy = (1 - aV.y) / 2 * innerHeight, rad = Math.max(50, ASTRO.s * 1.25 / VH * innerHeight); return Math.hypot(cx - sx, cy - sy) < rad; };
addEventListener('pointerdown', e => { if (e.button || e.target.closest('a,button,input,textarea,.stk')) return; if (!nearAstro(e.clientX, e.clientY)) return;
  e.preventDefault(); GRAB.on = true; [GRAB.x, GRAB.y] = toWorld(e.clientX, e.clientY); GRAB.hist = [[GRAB.x, GRAB.y, performance.now()]]; document.body.classList.add('grabbing');
  const now = performance.now(); GRAB.taps = GRAB.taps.filter(t => now - t < 650).concat(now);
  if (GRAB.taps.length >= 3) { GRAB.taps = []; GRAB.free = !GRAB.free; GRAB.left = 0;
    if (GRAB.free) { AS.vx = (Math.random() - .5) * VH * .12; AS.vy = VH * .05; }
    const n = document.createElement('div'); n.className = 'three'; n.style.color = '#cfd8ff'; n.textContent = GRAB.free ? 'untethered!' : 'clipped back on'; n.style.left = (e.clientX + 24) + 'px'; n.style.top = (e.clientY - 40) + 'px'; document.body.appendChild(n); setTimeout(() => n.remove(), 1200); }
}, { passive: false });
addEventListener('pointermove', e => { if (GRAB.on) { [GRAB.x, GRAB.y] = toWorld(e.clientX, e.clientY); GRAB.hist.push([GRAB.x, GRAB.y, performance.now()]); if (GRAB.hist.length > 6) GRAB.hist.shift(); return; }
  if (e.pointerType === 'mouse') document.body.classList.toggle('grab-astro', nearAstro(e.clientX, e.clientY)); });
const letGo = () => { if (!GRAB.on) return; GRAB.on = false; document.body.classList.remove('grabbing');
  if (GRAB.free) { const h = GRAB.hist, a = h[0], b = h[h.length - 1], dt = (b[2] - a[2]) / 1000; if (dt > .01) { AS.vx = (b[0] - a[0]) / dt * .6; AS.vy = (b[1] - a[1]) / dt * .6; } }
  else GRAB.left = 1; };
addEventListener('pointerup', letGo); addEventListener('pointercancel', letGo);
function poseNight(p, time) {
  // the ship lives at the very end of the page: it rides up with the footer and floats there
  const fr = footEl.getBoundingClientRect(), h = innerHeight;
  // it drifts in a slow loop beside the 'for the kid that…' line
  const kr = kidEl.getBoundingClientRect();
  const shipPy = ASTRO.ship.mobile ? kr.top - 60 : kr.top + kr.height * .5 - 70;
  const endPy = shipPy - (document.documentElement.scrollHeight - innerHeight - scrollY);
  const sx = ASTRO.ship.mobile ? ASTRO.ship.x : Math.min(ASTRO.ship.x, ((kr.right + 30 + (innerWidth - kr.right) * .45) / innerWidth - .5) * VW);
  ship.position.set(sx + Math.sin(time * .23) * .22 * ASTRO.ship.s, (.5 - shipPy / h) * VH + Math.sin(time * .31) * .14 * ASTRO.ship.s + Math.sin(time * .6) * .03, Math.cos(time * .23) * .15);
  ship.scale.setScalar(ASTRO.ship.s);
  ship.rotation.set(.22 + Math.sin(time * .4) * .02, -.6 + Math.sin(time * .25) * .05, .05 + Math.sin(time * .33) * .02);
  const shipIn = clamp((h - fr.top) / (h * .25));
  ship.visible = fr.top < h; setOpacity(shipMats, shipIn);
  ship.updateMatrixWorld(true);
  hatchGroup.getWorldPosition(hatchWorld); hatchGroup.getWorldDirection(hatchN);
  // how far along the boarding he is depends on how much of the ship is on screen
  const reel = ease(clamp((h * .98 - shipPy) / Math.max(60, (h * .98 - endPy) * .9)));
  const u = Math.min(.93, p / .9 * .93);
  let [tx, ty, tz] = along(u);
  if (GRAB.on) { tx = GRAB.x; ty = GRAB.y; tz = 0; } else if (GRAB.left > 0) { const k = GRAB.left; tx += (GRAB.x - tx) * k; ty += (GRAB.y - ty) * k; GRAB.left = Math.max(0, k - (time - (GRAB.t || time)) * .35); } GRAB.t = time;
  const dtn = Math.min(.05, Math.max(0, time - (AS.t || time))); AS.t = time;
  if (AS.x === undefined) Object.assign(AS, { x: tx, y: ty, z: tz, vx: 0, vy: 0, vz: 0, spin: 0 });
  const kS = 6, dS = 4.2;                                  // a soft spring: weightless, never snappy
  if (GRAB.free && !GRAB.on) {                             // untethered: drift on, bounce softly off the edges of the screen
    const bx = VW * .46, by = VH * .44, sp = Math.hypot(AS.vx, AS.vy), cap = VH * .9;
    if (sp > cap) { AS.vx *= cap / sp; AS.vy *= cap / sp; }
    AS.vx *= 1 - .05 * dtn; AS.vy *= 1 - .05 * dtn; AS.vz += (0 - AS.z) * dtn - AS.vz * dtn;
    if (Math.abs(AS.x) > bx && AS.x * AS.vx > 0) AS.vx *= -.8; if (Math.abs(AS.y) > by && AS.y * AS.vy > 0) AS.vy *= -.8;
    if (Math.hypot(AS.vx, AS.vy) < VH * .02) { AS.vx += Math.sin(time * .3) * VH * .004; AS.vy += Math.cos(time * .27) * VH * .004; }
  } else {
  AS.vx += ((tx - AS.x) * kS - AS.vx * dS) * dtn; AS.vy += ((ty - AS.y) * kS - AS.vy * dS) * dtn; AS.vz += ((tz - AS.z) * kS - AS.vz * dS) * dtn;
  }
  AS.x += AS.vx * dtn; AS.y += AS.vy * dtn; AS.z += AS.vz * dtn;
  AS.spin += (.1 + Math.min(.5, Math.abs(AS.vy) * .45)) * dtn;
  const falling = clamp(-AS.vy * 1.4, 0, 1);
  // two stages: drift to a point just outside the hatch, then glide in through it
  const appr = clamp(reel / .72), enter = clamp((reel - .72) / .28);
  const ax = hatchWorld.x + hatchN.x * .55 * ASTRO.ship.s, ay = hatchWorld.y + hatchN.y * .55 * ASTRO.ship.s, az = hatchWorld.z + hatchN.z * .55 * ASTRO.ship.s;
  const ix = hatchWorld.x - hatchN.x * .9 * ASTRO.ship.s, iy = hatchWorld.y - hatchN.y * .9 * ASTRO.ship.s, iz = hatchWorld.z - hatchN.z * .9 * ASTRO.ship.s;
  const ea = ease(appr), ee = enter * enter * (3 - 2 * enter);
  let px = AS.x + (ax - AS.x) * ea, py = AS.y + (ay - AS.y) * ea, pz = AS.z + (az - AS.z) * ea;
  px += (ix - ax) * ee; py += (iy - ay) * ee; pz += (iz - az) * ee;
  astro.position.set(px, py + Math.sin(time * .9) * .03 * (1 - appr), pz);
  astro.scale.setScalar(ASTRO.s);
  // postures along the way; a reach as he nears the hatch, a tuck as he goes in
  const pose = enter > 0 ? mixPose(.64 + (1 - enter) * .0) : appr > .05 ? mixPose(.82 + appr * .11) : mixPose(u);
  const calm = 1 - appr;
  pose.aR[1] += falling * .6 * calm; pose.aL[1] += falling * .6 * calm; pose.aR[0] -= falling * .25 * calm; pose.aL[0] -= falling * .25 * calm;
  pose.lR[2] += falling * .3 * calm; pose.lL[2] += falling * .4 * calm;
  applyPose(pose, time);
  qPose.setFromEuler(eTmp.set(pose.body[0] + Math.sin(AS.spin * .9) * .2 * calm + AS.vy * .1, pose.body[1] + Math.sin(AS.spin * .6) * .32 * calm, pose.body[2] + Math.sin(AS.spin) * .25 * calm - AS.vx * .2));
  // turn feet-first toward the hatch before going in
  qAlign.setFromUnitVectors(vDown, vTmp.copy(hatchN).negate());
  astroBody.quaternion.copy(qPose).slerp(qAlign, ease(clamp((appr - .45) / .55)));
  astroBody.scale.set(1, 1 + Math.sin(time * 1.6) * .006, 1);   // breathing
  setOpacity(astroMats, 1 - clamp((enter - .9) / .1));
  if (mixer) mixer.update(dtn);
  // tether: slack while he floats, drawn in as he approaches
  const tv = clamp(appr * 4) * (1 - enter);
  tether.visible = tv > .01; tether.material.opacity = .8 * tv;
  if (tether.visible) {
    packWorld.set(0, .1, -.48); astroBody.localToWorld(packWorld);
    const arr = tetherGeo.attributes.position.array, slack = (1 - appr) * .7 + .04;
    for (let i = 0; i < tetherPts; i++) {
      const t = i / (tetherPts - 1), sag = Math.sin(t * Math.PI) * slack, wob = Math.sin(t * 9 + time * 1.3) * .03 * slack;
      arr[i * 3] = packWorld.x + (hatchWorld.x - packWorld.x) * t + wob;
      arr[i * 3 + 1] = packWorld.y + (hatchWorld.y - packWorld.y) * t - sag;
      arr[i * 3 + 2] = packWorld.z + (hatchWorld.z - packWorld.z) * t;
    }
    tetherGeo.attributes.position.needsUpdate = true; tetherGeo.computeBoundingSphere();
  }
  // once he's in, the hatch swings shut and the cabin lights come on
  const shut = clamp((reel - .97) / .03);
  hatchPivot.rotation.y = -1.9 * (1 - shut);
  hatchHole.visible = shut < .98;
  sWin.emissiveIntensity = 1.6 * shut;
  const blink = (time * 1.2) % 1 < .12 ? 1 : .15; sRed.opacity = sGreen.opacity = blink * clamp((innerHeight - fr.top) / (innerHeight * .25));
}


/* if assets/models/astronaut.glb exists, use it instead of the built model */
if (THREE.GLTFLoader) new THREE.GLTFLoader().load('assets/models/astronaut.glb', g => {
  const m = g.scene, box = new THREE.Box3().setFromObject(m), size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
  const k = 2.2 / Math.max(size.y, size.x, size.z); m.scale.setScalar(k); m.position.copy(c).multiplyScalar(-k);
  m.traverse(o => { if (o.isMesh) { const ms = Array.isArray(o.material) ? o.material : [o.material];
    ms.forEach(mt => { mt.transparent = true; if (!mt.envMap) { mt.envMap = spaceEnv; mt.envMapIntensity = .6; } astroMats.push(mt); }); } });
  astroBody.children.forEach(ch => ch.visible = false);
  astroBody.add(m);
  if (g.animations && g.animations.length) { mixer = new THREE.AnimationMixer(m); mixer.clipAction(g.animations[0]).play(); }
}, undefined, () => {});

ASTRO_READY = true; astroLayout();
let leaves = false;
const tmpV = new THREE.Vector3();
function dropPages() {
  leaves = true;
  tmpV.set(craft.position.x, craft.position.y - .6 * anchor.s, craft.position.z).project(camera);
  const sx = (tmpV.x + 1) / 2 * innerWidth, sy = (1 - tmpV.y) / 2 * innerHeight;
  if (!RM) for (let i = 0; i < 7; i++) {
    const d = document.createElement('i'); d.className = 'leaf'; d.style.left = sx + 'px'; d.style.top = sy + 'px'; document.body.appendChild(d);
    const dx = (Math.random() - .5) * 320, fall = innerHeight * (.35 + Math.random() * .3), rot = (Math.random() - .5) * 900, dur = 2400 + Math.random() * 1400;
    d.animate([{ transform: 'translate(0,0) rotate(0deg) scale(.6)', opacity: 0 }, { transform: `translate(${dx * .3}px,${fall * .15}px) rotate(${rot * .2}deg) scale(1)`, opacity: 1, offset: .12 },
      { transform: `translate(${dx * .7}px,${fall * .55}px) rotate(${rot * .6}deg) scaleX(-1)`, opacity: 1, offset: .55 }, { transform: `translate(${dx}px,${fall}px) rotate(${rot}deg)`, opacity: 0 }],
      { duration: dur, delay: i * 140, easing: 'cubic-bezier(.25,.4,.45,1)', fill: 'forwards' }).onfinish = () => d.remove();
  }
}
function frame() {
  const time = clockT.getElapsedTime(), dt = Math.min(time - tPrev, .1); tPrev = time;
  if (launchT < 0) { P += (target - P) * (RM ? 1 : Math.min(1, dt * 6)); if (Math.abs(target - P) < 1e-4) P = target; }
  const k = launchT >= 0 ? 1 : seg(P, .015, .1);
  const night = darkNow();
  $('hero').style.setProperty('--k', night ? 1 : k.toFixed(3));
  $('sheetShade').style.opacity = night ? 0 : (1 - Math.min(1, k * 3)).toFixed(3);
  craft.visible = !night; smoke.visible = !night; window.__night = night;
  hemi.visible = key.visible = fill.visible = rim.visible = !night;
  if (typeof poseNight === 'function') { nightG.visible = night; if (night) poseNight(P, RM ? 0 : time); }
  anchor = { x: heroA.x + (home.x - heroA.x) * k, y: heroA.y + (home.y - heroA.y) * k, s: heroA.s + (home.s - heroA.s) * k };
  const st = pose(launchT >= 0 ? 1 : P, RM ? 0 : time, k);
  const dk = darkNow();
  paperMat.color.set(0xffffff);
  paperMat.emissive.setHex(0xffffff); paperMat.emissiveIntensity = night ? 0 : .42 - .27 * k;
  PAPER.t = RM ? 0 : time; PAPER.amp = night || RM ? 0 : .055 * (1 - seg(P, .06, .12));
  hemi.intensity = dk ? .74 : .8;
  if (target > .985 && launchT < 0 && st.asm >= 1 && !night) { launchT = 0; if (!sounded) { rumble(); sounded = true; } }
  if (launchT > .5 && !leaves && !night) dropPages();
  if ((target < .93 || night) && leaves) { leaves = false; $('cvPop').classList.remove('on'); }
  if (target < .93 && launchT >= 0) { launchT = -1; reborn = 0; sounded = false; puffs.forEach(q => { q.life = 0; q.s.visible = false; }); }
  let lift = 0, burn = 0;
  if (launchT >= 0) {
    launchT += RM ? 0 : dt;
    burn = RM ? 0 : clamp(launchT / .9);
    const tl = Math.max(0, launchT - .9);
    lift = 1.2 * tl * tl + tl * .3;
    if (!RM && launchT < 4) {
      const rate = launchT < 2.4 ? 3 : 1;
      for (let n = 0; n < rate; n++) {
        const q = puffs.find(q => q.life <= 0); if (!q) break;
        q.life = 1; q.s.visible = true; q.sz = .25 + Math.random() * .25;
        const pad = new THREE.Vector3(0, -HH - .7, tubeZ); body.localToWorld(pad);
        q.s.position.copy(pad).add(new THREE.Vector3((Math.random() - .5) * .2 * anchor.s, 0, 0));
        if (lift > .4) q.s.position.y = Math.min(q.s.position.y, anchor.y - 1.1 * anchor.s);
        q.vx = (Math.random() - .5) * 2 * (lift < .5 ? 1.4 : .45) * anchor.s * 2; q.vy = (lift < .5 ? Math.random() * .25 : -.2 - Math.random() * .4) * anchor.s * 2;
      }
    }
  }
  puffs.forEach(q => {
    if (q.life <= 0) return;
    q.life -= dt * .38; q.s.position.x += q.vx * dt; q.s.position.y += q.vy * dt; q.vx *= .985; q.vy *= .985;
    const s = q.sz * (1 + (1 - q.life) * 3.2) * anchor.s * 1.6; q.s.scale.set(s, s, 1);
    q.s.material.opacity = Math.max(0, q.life) * (dk ? .3 : .4);
    if (q.life <= 0) q.s.visible = false;
  });
  const flick = RM ? 1 : (.85 + Math.random() * .3);
  flameOut.material.opacity = burn * .85; flameIn.material.opacity = burn;
  flameOut.scale.set(1, (.4 + burn * .8) * flick, 1); flameIn.scale.set(1, (.5 + burn * .6) * (2 - flick), 1);
  glow.intensity = burn * 2.2 * flick;
  const shake = launchT > 0 && launchT < 2 && !RM ? (Math.random() - .5) * .015 * burn : 0;
  if (reborn < 1) reborn = Math.min(1, reborn + dt * 1.6);
  const scrollWith = (1 - k) * (scrollY / innerHeight) * VH;
  craft.position.set(anchor.x + st.fx + shake, anchor.y + scrollWith + st.fy + lift, st.fz);
  craft.scale.setScalar(anchor.s * (reborn < 1 ? ease(reborn) : 1) * (st.flying ? 1.25 : 1));
  renderer.render(scene, camera);
}
onTheme = () => {
  const dk = darkNow();
  edgeMat.color.set(dk ? 0x9a968d : 0xaaa69d);
  key.intensity = dk ? .5 : .45;
  bandMat.color.set(dk ? 0x1b1c20 : 0x2a2b30);
  puffs.forEach(q => q.s.material.color.set(dk ? 0xbfbfc4 : 0x8e8e93));
};
paintMode();
startLoop(frame);
})();
