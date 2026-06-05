
document.getElementById("playBtn").addEventListener("click", () => {
    document.getElementById("bgMusic").play();
});



window.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bgMusic");
    console.log(audio.muted, audio.volume);
});
    
/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .glass-card, .swatch, .size-btn, label').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});

/* ============================================================
   PARTICLE SYSTEM
   ============================================================ */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let particlesEnabled = true;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.6 + 0.2;
    this.life = Math.random() * 200 + 100;
    this.maxLife = this.life;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
    if (this.life <= 0) this.reset();
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    const alpha = (this.life / this.maxLife) * this.opacity;
    const theme = document.documentElement.getAttribute('data-theme');
    const color = theme === 'light' ? `rgba(0,100,200,${alpha})` : `rgba(0,212,255,${alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
}

// Initialize particles
for (let i = 0; i < 120; i++) particles.push(new Particle());

// Connection lines
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const alpha = (1 - dist / 100) * 0.1;
        const theme = document.documentElement.getAttribute('data-theme');
        ctx.strokeStyle = theme === 'light' ? `rgba(0,100,200,${alpha})` : `rgba(0,212,255,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  if (!particlesEnabled) { ctx.clearRect(0, 0, canvas.width, canvas.height); requestAnimationFrame(animateParticles); return; }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ============================================================
   NAVBAR SCROLL EFFECT
   ============================================================ */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
});

/* ============================================================
   HAMBURGER / MOBILE NAV
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMobile.classList.toggle('open');
});

document.querySelectorAll('.nav-link-mob').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMobile.classList.remove('open');
  });
});

/* ============================================================
   TYPING EFFECT
   ============================================================ */
const phrases = [
  'Affiliate Marketer 📈',
  'Young Entrepreneur 🚀',
  'Digital Wealth Builder 💰',
  'Content Creator 🎯',
  'Teaching Online Income 📱',
  'Inspiring Young Africans 🌍'
];
let phraseIndex = 0, charIndex = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function typeWriter() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeWriter, 2000);
      return;
    }
  } else {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeWriter, deleting ? 50 : 80);
}
setTimeout(typeWriter, 1000);

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
const counters = document.querySelectorAll('.num[data-target]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = +entry.target.getAttribute('data-target');
      const suffix = entry.target.nextElementSibling?.textContent?.includes('+') ? '+' : '';
      let current = 0;
      const step = target / 60;
      const update = () => {
        current = Math.min(current + step, target);
        entry.target.textContent = Math.floor(current);
        if (current < target) requestAnimationFrame(update);
        else entry.target.textContent = target;
      };
      update();
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

/* ============================================================
   SKILL BARS ANIMATION
   ============================================================ */
const skillFills = document.querySelectorAll('.skill-bar-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      entry.target.style.width = width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ============================================================
   SETTINGS PANEL
   ============================================================ */
const settingsToggle = document.getElementById('settingsToggle');
const settingsPanel  = document.getElementById('settingsPanel');

settingsToggle.addEventListener('click', () => {
  settingsPanel.classList.toggle('open');
});

// Close when clicking outside
document.addEventListener('click', (e) => {
  if (!settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
    settingsPanel.classList.remove('open');
  }
});

// THEME TOGGLE
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('change', () => {
  document.documentElement.setAttribute('data-theme', themeToggle.checked ? 'light' : 'dark');
});

// PARTICLES TOGGLE
const particleToggle = document.getElementById('particleToggle');
particleToggle.addEventListener('change', () => {
  particlesEnabled = particleToggle.checked;
  canvas.style.opacity = particlesEnabled ? '0.5' : '0';
});

// SCANLINE TOGGLE
const scanlineToggle = document.getElementById('scanlineToggle');
scanlineToggle.addEventListener('change', () => {
  document.querySelector('.scanlines').style.opacity = scanlineToggle.checked ? '0.4' : '0';
});

// ACCENT COLOR
const accentColors = {
  cyan:   { cyan: '#00d4ff', blue: '#0066ff', glow: '#00aaff', hot: '#00ffcc' },
  green:  { cyan: '#00ff88', blue: '#00aa44', glow: '#00cc66', hot: '#aaff00' },
  purple: { cyan: '#aa00ff', blue: '#6600cc', glow: '#8800dd', hot: '#ff00aa' },
  orange: { cyan: '#ff6600', blue: '#cc3300', glow: '#ff4400', hot: '#ffaa00' },
};

document.querySelectorAll('.swatch').forEach(swatch => {
  swatch.addEventListener('click', () => {
    document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
    swatch.classList.add('active');
    const colors = accentColors[swatch.getAttribute('data-accent')];
    const root = document.documentElement;
    root.style.setProperty('--accent-cyan', colors.cyan);
    root.style.setProperty('--accent-blue', colors.blue);
    root.style.setProperty('--accent-glow', colors.glow);
    root.style.setProperty('--accent-hot',  colors.hot);
  });
});

// FONT SIZE
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.documentElement.style.fontSize = btn.getAttribute('data-size') + 'px';
  });
});

/* ============================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============================================================
   GLITCH EFFECT RANDOM TRIGGER
   ============================================================ */
function triggerGlitch() {
  const glitchEls = document.querySelectorAll('.glitch-wrap');
  glitchEls.forEach(el => {
    el.style.animation = 'none';
    setTimeout(() => {
      el.style.animation = '';
    }, 50);
  });
}
setInterval(triggerGlitch, 4000);

