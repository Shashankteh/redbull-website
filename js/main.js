/* ============================================
   RED BULL — main.js
   Animations: Lenis + GSAP + ScrollTrigger
   ============================================ */

import Lenis from 'https://cdn.skypack.dev/@studio-freight/lenis@1.0.42';

// ===== WAIT FOR DOM =====
document.addEventListener('DOMContentLoaded', () => {

  // ===== GSAP REGISTER =====
  gsap.registerPlugin(ScrollTrigger);

  // ===== LENIS SMOOTH SCROLL =====
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // ===== SCROLL PROGRESS BAR =====
  const progressBar = document.getElementById('progress-bar');
  lenis.on('scroll', ({ progress }) => {
    gsap.set(progressBar, { scaleX: progress });
  });

  // ===== LOADER =====
  const loaderLogo = document.querySelectorAll('.loader-logo span');
  const loaderBar = document.querySelector('.loader-bar');
  const loaderCount = document.querySelector('.loader-count');
  const loader = document.getElementById('loader');

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 8 + 2;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      // Animate loader out
      const tl = gsap.timeline();
      tl.to(loaderCount, { opacity: 0, duration: 0.3 })
        .to(loaderBar, { opacity: 0, duration: 0.3 }, '<')
        .to(loaderLogo, { y: '-110%', stagger: 0.06, duration: 0.8, ease: 'power4.in' }, 0.2)
        .to(loader, { scaleY: 0, transformOrigin: 'top', duration: 0.8, ease: 'power4.inOut' }, 0.6)
        .call(() => {
          loader.style.display = 'none';
          initHeroAnimation();
        });
    }

    loaderBar.style.width = progress + '%';
    loaderCount.textContent = Math.floor(progress) + '%';
  }, 60);

  // Animate loader logo letters in
  gsap.to(loaderLogo, {
    y: '0%',
    stagger: 0.06,
    duration: 0.9,
    ease: 'power4.out',
    delay: 0.2
  });

  // ===== HERO ANIMATION =====
  function initHeroAnimation() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to('.hero-eyebrow span, .hero-eyebrow .dot', {
        y: '0%', stagger: 0.05, duration: 1
      }, 0)
      .to('.h-word', {
        y: '0%', stagger: 0.1, duration: 1.2
      }, 0.1)
      .to('.hero-desc', {
        opacity: 1, y: 0, duration: 1
      }, 0.7)
      .to('.hero-scroll-hint', {
        opacity: 1, y: 0, duration: 1
      }, 0.9);

    // Particle canvas
    initParticles();
  }

  // ===== PARTICLE BACKGROUND =====
  function initParticles() {
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const count = 120;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 90, 255, ${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      requestAnimationFrame(drawParticles);
    }

    drawParticles();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // ===== CUSTOM CURSOR =====
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    gsap.set(cursor, { x: mx, y: my });
  });

  gsap.ticker.add(() => {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    gsap.set(ring, { x: rx, y: ry });
  });

  document.querySelectorAll('a, button, .product-card, .stat-box').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { width: 6, height: 6, duration: 0.3 });
      gsap.to(ring, { width: 70, height: 70, borderColor: 'rgba(0,90,255,0.6)', duration: 0.4 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { width: 10, height: 10, duration: 0.3 });
      gsap.to(ring, { width: 44, height: 44, borderColor: 'rgba(0,90,255,0.4)', duration: 0.4 });
    });
  });

  // ===== NAV SCROLL STATE =====
  ScrollTrigger.create({
    start: 80,
    onUpdate: self => {
      const nav = document.getElementById('nav');
      if (self.progress > 0) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }
  });

  // ===== MANIFESTO - 4-panel word reveal =====
  const mTexts = document.querySelectorAll('.m-text');
  const totalPanels = mTexts.length;

  ScrollTrigger.create({
    trigger: '#manifesto',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    onUpdate: self => {
      const prog = self.progress;
      mTexts.forEach((el, i) => {
        const start = i / totalPanels;
        const end = (i + 1) / totalPanels;
        const active = prog >= start && prog <= end + 0.05;

        const cls = el.dataset.activeClass || 'active';
        if (active) {
          el.classList.add(cls);
        } else {
          el.classList.remove(cls);
        }
      });
    }
  });

  // ===== STATS COUNTER =====
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = el.dataset.decimals || 0;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo({ val: 0 }, { val: target }, {
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: function() {
            const v = this.targets()[0].val;
            el.querySelector('.num').textContent =
              prefix + (decimals > 0 ? v.toFixed(decimals) : Math.floor(v)) + suffix;
          }
        });
      }
    });
  });

  // ===== HORIZONTAL PRODUCTS SCROLL =====
  const track = document.getElementById('products-track');
  if (track) {
    const cards = track.querySelectorAll('.product-card');
    const totalW = (380 + 20) * (cards.length - 1);

    gsap.to(track, {
      x: -totalW,
      ease: 'none',
      scrollTrigger: {
        trigger: '#products',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    });
  }

  // ===== WORLD SECTION - Text reveal on scroll =====
  const worldWords = document.querySelectorAll('.wt-word');
  const worldSub = document.querySelector('.world-sub');
  const worldTag = document.querySelector('.world-tag');

  ScrollTrigger.create({
    trigger: '#world',
    start: 'top top',
    end: 'bottom bottom',
    scrub: false,
    onEnter: () => {
      gsap.to(worldTag, { opacity: 0.7, duration: 0.6 });
      gsap.to(worldWords, {
        y: '0%',
        stagger: 0.08,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.2
      });
      gsap.to(worldSub, {
        opacity: 0.6,
        y: 0,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
      });
    }
  });

  // Radial lines rotate on scroll
  gsap.to('.w-line', {
    rotation: 'random(-30, 30)',
    stagger: { each: 0.2, from: 'center' },
    scrollTrigger: {
      trigger: '#world',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2
    }
  });

  // ===== GENERAL SCROLL REVEALS =====
  gsap.utils.toArray('.sr-hidden').forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  gsap.utils.toArray('.sr-hidden-left').forEach(el => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  gsap.utils.toArray('.sr-hidden-right').forEach(el => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  gsap.utils.toArray('.sr-hidden-scale').forEach(el => {
    gsap.to(el, {
      opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // ===== ENERGY SECTION BG TEXT PARALLAX =====
  gsap.to('.energy-bg-text', {
    x: -150,
    scrollTrigger: {
      trigger: '#energy',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2
    }
  });

  // ===== PRODUCT CARD HOVER TILT =====
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotationY: x * 12,
        rotationX: -y * 12,
        transformPerspective: 800,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.7)'
      });
    });
  });

  // ===== STAGGER SECTIONS =====
  // Stats boxes
  gsap.from('.stat-box', {
    y: 60, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '#stats', start: 'top 70%', toggleActions: 'play none none reverse' }
  });

  // Ingredient grid
  gsap.from('.ingredient', {
    y: 50, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: '#energy', start: 'top 65%', toggleActions: 'play none none reverse' }
  });

  // CTA
  const ctaTl = gsap.timeline({
    scrollTrigger: { trigger: '#cta', start: 'top 70%', toggleActions: 'play none none reverse' }
  });
  ctaTl
    .from('.cta-tag', { opacity: 0, y: 20, duration: 0.6 })
    .from('.cta-title', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' }, 0.1)
    .from('.cta-btn', { opacity: 0, y: 20, duration: 0.6 }, 0.4);

  // Footer
  gsap.from('.footer-grid > *', {
    y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: 'footer', start: 'top 80%' }
  });

});
