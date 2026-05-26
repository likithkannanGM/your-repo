/* ════════════════════════════════════════════════
   HAPPY BIRTHDAY AISHU — script.js
   All interactive magic: stars, hearts, pandas,
   surprise button, easter eggs, scroll reveals
════════════════════════════════════════════════ */

/* ── 1. STAR CANVAS ─────────────────────────── */
(function initStars() {
  const canvas = document.getElementById('starCanvas');
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');
  let stars    = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStar() {
    return {
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      r:    Math.random() * 1.4 + 0.3,
      // Twinkle speed varies per star
      speed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
      // Gold-tinted or white stars
      hue:  Math.random() > 0.85 ? '#f0cc7a' : '#fdf6ec',
    };
  }

  function buildStars(count = 160) {
    stars = Array.from({ length: count }, createStar);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = Date.now() * 0.001;
    stars.forEach(s => {
      const alpha = 0.35 + 0.55 * Math.abs(Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.hue;
      ctx.globalAlpha = alpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  resize();
  buildStars();
  draw();
  window.addEventListener('resize', () => { resize(); buildStars(); });
})();


/* ── 2. FLOATING HEARTS ─────────────────────── */
(function initHearts() {
  const layer  = document.getElementById('hearts-layer');
  if (!layer) return;
  const emojis = ['💕', '💖', '💗', '💓', '🤍', '✨'];

  function spawnHeart() {
    const el = document.createElement('span');
    el.className = 'heart';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left     = Math.random() * 100 + 'vw';
    el.style.fontSize = (Math.random() * 14 + 10) + 'px';
    const dur = Math.random() * 12 + 10;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay    = (Math.random() * 3) + 's';
    layer.appendChild(el);
    // Remove after animation to avoid DOM bloat
    setTimeout(() => el.remove(), (dur + 4) * 1000);
  }

  // Spawn a heart every 1.5 s
  setInterval(spawnHeart, 1500);
  // Kick off a few immediately
  for (let i = 0; i < 6; i++) spawnHeart();
})();


/* ── 3. SPARKLES IN HERO ────────────────────── */
(function initSparkles() {
  const container = document.getElementById('sparkle-container');
  if (!container) return;

  function makeSparkle() {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const size = Math.random() * 5 + 2;
    s.style.cssText = `
      left:   ${Math.random() * 100}%;
      top:    ${Math.random() * 100}%;
      width:  ${size}px;
      height: ${size}px;
      animation-duration:  ${Math.random() * 3 + 2}s;
      animation-delay:     ${Math.random() * 4}s;
    `;
    container.appendChild(s);
  }

  for (let i = 0; i < 50; i++) makeSparkle();
})();


/* ── 4. SCROLL REVEAL ───────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const io  = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.15 }
  );
  els.forEach(el => io.observe(el));
})();


/* ── 5. CARD TILT EFFECT ────────────────────── */
(function initTilt() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const cx    = rect.left + rect.width  / 2;
      const cy    = rect.top  + rect.height / 2;
      const dx    = (e.clientX - cx) / (rect.width  / 2);
      const dy    = (e.clientY - cy) / (rect.height / 2);
      const rotX  = -dy * 8;
      const rotY  =  dx * 8;
      card.style.transform =
        `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ── 6. SURPRISE BUTTON ─────────────────────── */
(function initSurprise() {
  const btn     = document.getElementById('surprise-btn');
  const message = document.getElementById('birthday-message');
  const rainDiv = document.getElementById('panda-rain');
  if (!btn || !message) return;

  // Real panda image URLs for the rain
  const pandaImgs = [
    'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1527118732049-c88155f2107c?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1590502160462-58b41354f588?w=200&h=200&fit=crop&crop=face',
  ];

  function rainPandas() {
    const count = window.innerWidth < 480 ? 12 : 20;
    for (let i = 0; i < count; i++) {
      const img = document.createElement('img');
      img.className = 'rain-panda';
      img.src   = pandaImgs[Math.floor(Math.random() * pandaImgs.length)];
      img.alt   = 'Panda';
      img.style.left    = Math.random() * 100 + 'vw';
      img.style.animationDuration = (Math.random() * 2.5 + 2) + 's';
      img.style.animationDelay    = (Math.random() * 1.5) + 's';
      rainDiv.appendChild(img);
      // Cleanup
      const dur = parseFloat(img.style.animationDuration) +
                  parseFloat(img.style.animationDelay) + 0.5;
      setTimeout(() => img.remove(), dur * 1000);
    }
  }

  let clicked = false;

  btn.addEventListener('click', () => {
    if (clicked) return;
    clicked = true;

    // 1. Screen shake
    document.body.classList.add('shaking');
    setTimeout(() => document.body.classList.remove('shaking'), 800);

    // 2. Panda rain
    rainPandas();

    // 3. Show birthday message
    message.classList.add('active');

    // 4. Change button text
    btn.querySelector('.btn-text').textContent = '✅ Already Clicked 🐼';
    btn.style.borderColor = 'var(--gold)';

    // 5. Scroll to message
    setTimeout(() => {
      message.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 400);
  });
})();


/* ── 7. EASTER EGGS ─────────────────────────── */
(function initEasterEggs() {
  const toast = document.getElementById('egg-toast');
  let toastTimer;

  // Panda egg messages
  const pandaMsgs = [
    '🐼 "I am the most chaotic panda and I own it."',
    '🎋 Panda says: have you eaten biryani today?',
    '🐼 This panda ships you two. Aggressively.',
    '🎋 *panda noises intensify*',
    '🐼 Certified Panda Whisperer™',
  ];

  // Biryani egg messages
  const biryaniMsgs = [
    '🍗 Hyderabadi biryani > everything. Period.',
    '🌶️ "It\'s not just food. It\'s a spiritual experience."',
    '🍚 Dum pukht: the original slow burn romance.',
    '🧅 The caramelised onions… the saffron… the drama…',
    '🍗 Biryani is love. Biryani is life. Biryani is Aishu.',
  ];

  function showToast(msg) {
    clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  // Attach to dancing pandas (hero section)
  document.querySelectorAll('.dancing-panda').forEach(panda => {
    panda.addEventListener('click', () => {
      const msg = pandaMsgs[Math.floor(Math.random() * pandaMsgs.length)];
      showToast(msg);
      // Mini bounce effect
      panda.style.transform = 'scale(1.4) rotate(20deg)';
      setTimeout(() => { panda.style.transform = ''; }, 350);
    });
  });

  // Attach to floating biryani
  const biryani = document.getElementById('hero-biryani');
  if (biryani) {
    biryani.addEventListener('click', () => {
      const msg = biryaniMsgs[Math.floor(Math.random() * biryaniMsgs.length)];
      showToast(msg);
    });
  }

  // Bonus: clicking finale panda image
  const finalePanda = document.querySelector('.finale-panda');
  if (finalePanda) {
    finalePanda.style.cursor = 'pointer';
    finalePanda.addEventListener('click', () => {
      showToast('🐼 "She chose pandas. She has excellent taste."');
    });
  }

  // Secret meme: click the page title area 5× fast
  let titleClicks = 0;
  let titleTimer;
  document.querySelector('.hero-title')?.addEventListener('click', () => {
    titleClicks++;
    clearTimeout(titleTimer);
    titleTimer = setTimeout(() => { titleClicks = 0; }, 2000);
    if (titleClicks >= 5) {
      titleClicks = 0;
      showToast('🎬 "She broke the fourth wall. Respect." — The Director');
    }
  });
})();


/* ── 8. DRAMATIC DIALOGUE POPUPS (Scroll triggered) ── */
(function initDialogues() {
  // Meme-style dialogues that appear once when each section enters viewport
  const dialogues = [
    { selector: '#iconic',   msg: '🎭 *dramatic violin plays as you scroll*' },
    { selector: '#timeline', msg: '🎬 "Every love story is beautiful, but ours is my favourite." — Mahesh Babu, probably' },
    { selector: '#finale',   msg: '💕 The credits are rolling but the story never ends.' },
  ];

  const toast = document.getElementById('egg-toast');
  let toastTimer;

  function showToast(msg) {
    clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const d = dialogues.find(d => e.target.matches(d.selector));
        if (d) {
          setTimeout(() => showToast(d.msg), 600);
          io.unobserve(e.target);
        }
      }
    });
  }, { threshold: 0.3 });

  dialogues.forEach(d => {
    const el = document.querySelector(d.selector);
    if (el) io.observe(el);
  });
})();


/* ── 9. DYNAMIC GOLD CURSOR TRAIL ────────────── */
(function initCursorTrail() {
  // Only on non-touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const sparks = [];
  const MAX    = 12;

  for (let i = 0; i < MAX; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--gold-light);
      pointer-events: none;
      z-index: 99999;
      opacity: 0;
      transition: opacity 0.3s;
      will-change: transform;
    `;
    document.body.appendChild(dot);
    sparks.push({ el: dot, x: 0, y: 0 });
  }

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  let front = 0;
  function animate() {
    sparks[front].x = mouseX;
    sparks[front].y = mouseY;
    sparks[front].el.style.transform =
      `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    sparks[front].el.style.opacity = '0.6';

    // Fade older dots
    sparks.forEach((s, i) => {
      if (i !== front) {
        const alpha = parseFloat(s.el.style.opacity) - 0.06;
        s.el.style.opacity = Math.max(0, alpha);
      }
    });

    front = (front + 1) % MAX;
    requestAnimationFrame(animate);
  }
  animate();
})();
