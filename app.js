/* ============================================
   NEXUS — Shared JavaScript Utilities
   ============================================ */

// ── Theme Management ──
const ThemeManager = {
  key: 'nexus-theme',
  
  init() {
    const saved = localStorage.getItem(this.key) || 'dark';
    this.set(saved);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    this.set(current === 'dark' ? 'light' : 'dark');
  },

  set(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.key, theme);
    const toggle = document.getElementById('themeToggle');
    if (toggle) toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
};

// ── Toast Notifications ──
const Toast = {
  container: null,

  init() {
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    document.body.appendChild(this.container);
  },

  show(message, type = 'info', duration = 3000) {
    if (!this.container) this.init();

    const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌', xp: '⚡' };
    const colors = {
      info: 'var(--accent-primary)',
      success: 'var(--accent-success)',
      warning: 'var(--accent-warning)',
      error: 'var(--accent-danger)',
      xp: 'var(--accent-secondary)'
    };

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderLeft = `3px solid ${colors[type]}`;
    toast.innerHTML = `
      <span style="font-size:1.25rem">${icons[type] || icons.info}</span>
      <span style="font-size:0.9375rem;color:var(--text-primary)">${message}</span>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'fadeInUp 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

// ── Intersection Observer for Scroll Animations ──
const ScrollAnimator = {
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-animate]').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
      observer.observe(el);
    });
  }
};

// ── Counter Animation ──
const CounterAnimator = {
  animate(el, target, duration = 1500, prefix = '', suffix = '') {
    const start = 0;
    const startTime = performance.now();

    const update = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * eased);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }
};

// ── Smooth Number Ticker ──
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.getAttribute('data-count'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    CounterAnimator.animate(el, target, 1500, prefix, suffix);
  });
}

// ── Nav Scroll Effect ──
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.style.borderBottomColor = 'var(--border-glass)';
    } else {
      nav.style.borderBottomColor = 'var(--border-subtle)';
    }
  }, { passive: true });
}

// ── Mobile Menu ──
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.style.display !== 'none';
    menu.style.display = isOpen ? 'none' : 'flex';
    btn.textContent = isOpen ? '☰' : '✕';
  });
}

// ── Progress Ring SVG ──
function createProgressRing(percent, size = 80, strokeWidth = 5, color = '#00d4ff') {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return `
    <svg width="${size}" height="${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${radius}"
        fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="${strokeWidth}"/>
      <circle cx="${size/2}" cy="${size/2}" r="${radius}"
        fill="none" stroke="${color}" stroke-width="${strokeWidth}"
        stroke-linecap="round"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${offset}"
        style="transition: stroke-dashoffset 1s ease;"/>
    </svg>
  `;
}

// ── Heatmap Generator ──
function generateHeatmap(containerId, data = []) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const weeks = 52;
  const days = 7;
  let html = '<div class="heatmap-grid">';

  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      const index = w * days + d;
      const level = data[index] ?? Math.floor(Math.random() * 5);
      html += `<div class="heatmap-cell" data-level="${level}" title="Level ${level}"></div>`;
    }
  }

  html += '</div>';
  container.innerHTML = html;
}

// ── Ripple Effect ──
function addRipple(el) {
  el.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute; width: ${size}px; height: ${size}px;
      left: ${x}px; top: ${y}px;
      background: rgba(255,255,255,0.15);
      border-radius: 50%; transform: scale(0);
      animation: ripple 0.6s ease-out forwards;
      pointer-events: none;
    `;

    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

// ── Local Storage Helpers ──
const Store = {
  get: (key, fallback = null) => {
    try {
      const val = localStorage.getItem(`nexus_${key}`);
      return val ? JSON.parse(val) : fallback;
    } catch { return fallback; }
  },
  set: (key, value) => {
    try { localStorage.setItem(`nexus_${key}`, JSON.stringify(value)); } catch {}
  },
  remove: (key) => localStorage.removeItem(`nexus_${key}`)
};

// ── XP System ──
const XPSystem = {
  levels: [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000, 18000],
  
  getLevel(xp) {
    let level = 1;
    for (let i = 0; i < this.levels.length; i++) {
      if (xp >= this.levels[i]) level = i + 1;
      else break;
    }
    return Math.min(level, 10);
  },

  getProgress(xp) {
    const level = this.getLevel(xp);
    if (level >= 10) return 100;
    const current = this.levels[level - 1];
    const next = this.levels[level];
    return Math.round(((xp - current) / (next - current)) * 100);
  },

  addXP(amount, reason) {
    const current = Store.get('xp', 0);
    const newXP = current + amount;
    Store.set('xp', newXP);
    Toast.show(`+${amount} XP — ${reason}`, 'xp');
    return newXP;
  }
};

// ── Ripple CSS injection ──
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  ScrollAnimator.init();
  initNavScroll();
  initMobileMenu();
  Toast.init();

  // Theme toggle button
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => ThemeManager.toggle());
  }

  // Ripple buttons
  document.querySelectorAll('.btn-primary').forEach(addRipple);

  // Animate counters when visible
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObserver.disconnect();
    }
  });
  const statsSection = document.querySelector('[data-stats]');
  if (statsSection) statsObserver.observe(statsSection);
});
