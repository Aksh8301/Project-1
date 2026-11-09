document.getElementById('year').textContent = new Date().getFullYear();
const greeting = document.getElementById('greeting');
const magic = document.getElementById('magic');
const status = document.getElementById('status');
if (greeting && status) greeting.addEventListener('click', () => {
  const greetings = ['Hello, awesome human! 👋','You make the web brighter! ✨','Big things start with Hello World! 🚀'];
  status.textContent = greetings[Math.floor(Math.random() * greetings.length)];
});
if (magic && status) magic.addEventListener('click', () => {
  status.textContent = 'A little magic, just for you! ✨';
  const card = document.querySelector('.hero-card');
  const symbols = ['✨','✦','💜','⭐','✧'];
  for (let i = 0; i < 20; i++) {
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    s.style.left = `${8 + Math.random() * 84}%`;
    s.style.top = `${35 + Math.random() * 55}%`;
    s.style.animationDelay = `${Math.random() * 250}ms`;
    card.appendChild(s);
    setTimeout(() => s.remove(), 1400);
  }
});
const form = document.getElementById('contact-form');
if (form) form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nSubject: ${data.get('subject')}\n\n${data.get('message')}`;
  const feedback = document.getElementById('contact-status');
  feedback.classList.remove('error');
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(message);
    feedback.textContent = 'Message copied! Paste it into your email app. Nothing has been sent.';
  } catch (_) {
    const output = document.createElement('textarea');
    output.value = message;
    output.setAttribute('aria-label','Prepared message to copy');
    output.style.cssText='width:100%;min-height:145px;margin-top:15px;border-radius:12px;padding:12px;color:white;background:#15162d;border:1px solid #a88bff';
    const old = document.getElementById('prepared-message');
    if (old) old.remove();
    output.id='prepared-message';
    feedback.insertAdjacentElement('afterend',output);
    output.focus(); output.select();
    feedback.textContent = 'Select and copy the message below. Nothing has been sent.';
  }
});
\n
/* Persist theme across pages while respecting system preference on first visit. */
(function () {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  const root = document.documentElement;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  function applyTheme(theme) {
    root.dataset.theme = theme;
    const isLight = theme === 'light';
    toggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    toggle.setAttribute('aria-pressed', String(isLight));
    toggle.querySelector('.theme-icon').textContent = isLight ? '🌙' : '☀️';
    toggle.querySelector('.theme-label').textContent = isLight ? 'Dark' : 'Light';
    if (themeColor) themeColor.content = isLight ? '#f7f8ff' : '#090a18';
  }
  applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark');
  toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('hello-world-theme', next); } catch (_) {}
  });
})();
