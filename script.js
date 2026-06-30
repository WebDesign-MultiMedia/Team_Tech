'use strict';

/* ── PRELOADER ─────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('done'), 1800);
});

/* ── LANGUAGE TOGGLE ───────────────────────────── */
let lang = localStorage.getItem('tt-lang') || 'en';

function applyLang(l) {
  lang = l;
  localStorage.setItem('tt-lang', l);
  document.querySelectorAll('.t[data-' + l + ']').forEach(el => {
    el.textContent = el.dataset[l];
  });
  document.querySelectorAll('.lbtn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === l);
  });
  document.getElementById('htmlRoot').lang = l;
}

document.querySelectorAll('.lbtn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

applyLang(lang);

/* ── NAVBAR ────────────────────────────────────── */
const nav  = document.getElementById('nav');
const ham  = document.getElementById('ham');
const links = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  links.classList.toggle('open');
});

links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    ham.classList.remove('open');
    links.classList.remove('open');
  });
});

/* ── CANVAS PARTICLES ──────────────────────────── */
(function () {
  const canvas = document.getElementById('canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, pts = [];

  const COLORS = ['rgba(204,26,26,', 'rgba(240,163,0,', 'rgba(221,227,238,'];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function rand(a, b) { return Math.random() * (b - a) + a; }

  class Pt {
    constructor() { this.reset(); }
    reset() {
      this.x  = rand(0, W);
      this.y  = rand(0, H);
      this.vx = rand(-.4, .4);
      this.vy = rand(-.4, .4);
      this.r  = rand(1, 2.5);
      this.c  = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.a  = rand(.3, .8);
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.c + this.a + ')';
      ctx.fill();
    }
  }

  function init() {
    resize();
    const count = Math.min(80, Math.floor((W * H) / 12000));
    pts = Array.from({ length: count }, () => new Pt());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < pts.length; i++) {
      pts[i].update();
      pts[i].draw();
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = 'rgba(255,255,255,' + (1 - d / 130) * .08 + ')';
          ctx.lineWidth = .8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); pts.forEach(p => p.reset()); });
  init();
  draw();
})();

/* ── REVIEW SLIDER ─────────────────────────────── */
(function () {
  const track   = document.getElementById('rvTrack');
  const cards   = track.querySelectorAll('.rv-card');
  const dotsEl  = document.getElementById('rvDots');
  const prevBtn = document.getElementById('rvPrev');
  const nextBtn = document.getElementById('rvNext');

  if (!track) return;

  let current = 0;
  let perView = getPerView();
  const total = cards.length;
  const maxIdx = total - perView;

  function getPerView() {
    return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  }

  function buildDots() {
    dotsEl.innerHTML = '';
    for (let i = 0; i <= maxIdx; i++) {
      const d = document.createElement('div');
      d.className = 'rv-dot' + (i === 0 ? ' on' : '');
      d.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(d);
    }
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIdx));
    const cardW = cards[0].offsetWidth + 24;
    track.style.transform = 'translateX(-' + (current * cardW) + 'px)';
    dotsEl.querySelectorAll('.rv-dot').forEach((d, i) => d.classList.toggle('on', i === current));
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  window.addEventListener('resize', () => {
    perView = getPerView();
    goTo(0);
    buildDots();
  });

  buildDots();

  /* Touch swipe */
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = startX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) goTo(dx > 0 ? current + 1 : current - 1);
  });

  /* Auto-advance */
  setInterval(() => goTo(current < maxIdx ? current + 1 : 0), 5000);
})();

/* ── SCROLL REVEAL ─────────────────────────────── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); revealObs.unobserve(e.target); } });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

/* ── SMOOTH ACTIVE NAV ─────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');

const secObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => secObs.observe(s));
