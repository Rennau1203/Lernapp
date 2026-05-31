 /* ═══════════════════════════════════════════════════════
   LERNAPP — ZENTRALES DESIGN-JAVASCRIPT
   Einbinden: <script src="design.js"></script> (Root)
          oder <script src="../design.js"></script> (Unterordner)
════════════════════════════════════════════════════════ */

// Panel öffnen/schließen
function togglePanel() {
  document.getElementById('design-panel').classList.toggle('open');
}

// Außerhalb klicken schließt Panel
document.addEventListener('click', function(e) {
  const panel = document.getElementById('design-panel');
  const btn   = document.querySelector('.design-btn');
  if (panel && btn && panel.classList.contains('open') &&
      !panel.contains(e.target) && !btn.contains(e.target)) {
    panel.classList.remove('open');
  }
});

// Hell/Dunkel umschalten — Theme bleibt gleich, nur Modus wechselt
function toggleMode() {
  const mode = document.documentElement.getAttribute('data-mode');
  const newMode = mode === 'dark' ? 'light' : 'dark';
  const theme = document.documentElement.getAttribute('data-theme');
  applyTheme(theme, newMode);
}

// Theme anwenden
function applyTheme(theme, mode) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('data-mode',  mode);
  const btn = document.getElementById('mode-btn');
  if (btn) btn.textContent = mode === 'dark' ? '🌙' : '☀️';
  document.querySelectorAll('.theme-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.theme === theme);
  });
  try {
    localStorage.setItem('lernapp-theme', theme);
    localStorage.setItem('lernapp-mode',  mode);
  } catch(e) {}
}

// Theme-Button im Panel geklickt — Modus bleibt gleich
function setTheme(btn) {
  const mode = document.documentElement.getAttribute('data-mode') || 'dark';
  applyTheme(btn.dataset.theme, mode);
}

// Gespeichertes Theme beim Laden wiederherstellen
(function() {
  try {
    const t = localStorage.getItem('lernapp-theme');
    const m = localStorage.getItem('lernapp-mode');
    if (t && m) applyTheme(t, m);
  } catch(e) {}
})();
