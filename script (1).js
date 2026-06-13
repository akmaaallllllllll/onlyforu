/* ── BACKGROUND MUSIC ────────────────────────────────────── */
const bgm       = document.getElementById('bgm');
const musicBtn  = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');
let   isPlaying = false;

bgm.volume = 0.45;

function toggleMusic() {
  if (isPlaying) {
    bgm.pause();
    musicIcon.classList.remove('playing');
    musicIcon.classList.add('paused');
    isPlaying = false;
  } else {
    bgm.play().catch(() => {});
    musicIcon.classList.add('playing');
    musicIcon.classList.remove('paused');
    isPlaying = true;
  }
}

musicBtn.addEventListener('click', toggleMusic);

// Auto-play on first user interaction with the page
function startOnInteraction() {
  if (!isPlaying) {
    bgm.play().then(() => {
      isPlaying = true;
      musicIcon.classList.add('playing');
      musicIcon.classList.remove('paused');
    }).catch(() => {});
  }
  document.removeEventListener('click', startOnInteraction);
  document.removeEventListener('keydown', startOnInteraction);
  document.removeEventListener('touchstart', startOnInteraction);
}
document.addEventListener('click', startOnInteraction);
document.addEventListener('keydown', startOnInteraction);
document.addEventListener('touchstart', startOnInteraction);

/* ── SCROLL-TRIGGERED ANIMATIONS ────────────────────────── */
const observerConfig = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerConfig);

document.querySelectorAll('.card, .promise-item, .value-row').forEach(el => {
  observer.observe(el);
});

/* ── MODALS ──────────────────────────────────────────────── */
const overlayYes   = document.getElementById('overlayYes');
const overlayMaybe = document.getElementById('overlayMaybe');
const btnYes       = document.getElementById('btnYes');
const btnMaybe     = document.getElementById('btnMaybe');
const closeYes     = document.getElementById('closeYes');
const closeMaybe   = document.getElementById('closeMaybe');

function openModal(overlay) {
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(overlay) {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

btnYes.addEventListener('click',   () => openModal(overlayYes));
btnMaybe.addEventListener('click', () => openModal(overlayMaybe));
closeYes.addEventListener('click',   () => closeModal(overlayYes));
closeMaybe.addEventListener('click', () => closeModal(overlayMaybe));

// Close on backdrop click
[overlayYes, overlayMaybe].forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay);
  });
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal(overlayYes);
    closeModal(overlayMaybe);
  }
});

/* ── COVER ENTRANCE ANIMATION ────────────────────────────── */
window.addEventListener('load', () => {
  document.querySelector('.cover-inner').style.animationPlayState = 'running';
});

/* ── SMOOTH PARALLAX FOR ORBS (subtle) ──────────────────── */
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const sy = window.scrollY;
      document.querySelector('.orb-1').style.transform = `translateY(${sy * .06}px)`;
      document.querySelector('.orb-2').style.transform = `translateY(${-sy * .04}px)`;
      ticking = false;
    });
    ticking = true;
  }
});

/* ── HEARTBEAT ON PLEA TEXT ──────────────────────────────── */
const plea = document.querySelector('.plea');
if (plea) {
  let scale = false;
  setInterval(() => {
    plea.style.transition = 'transform .3s ease';
    plea.style.transform = scale ? 'scale(1)' : 'scale(1.012)';
    scale = !scale;
  }, 2000);
}
