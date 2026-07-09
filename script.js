'use strict';

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

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── MOBILE MENU ───────────────────────────────── */
const mobileMenu = document.getElementById('mobileMenu');
const mmClose     = document.getElementById('mmClose');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  ham.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  ham.classList.remove('open');
  document.body.style.overflow = '';
}

ham.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
});

mmClose.addEventListener('click', closeMobileMenu);

/* Close when tapping the blurred backdrop (outside the panel) */
mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) closeMobileMenu();
});

/* Close on Escape */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMobileMenu();
});

/* Close after tapping any menu link */
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', closeMobileMenu);
});

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
