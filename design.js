/* ═══════════════════════════════════════════════════════
   LERNAPP — ZENTRALES DESIGN-JAVASCRIPT
   Einbinden mit: <script src="../design.js"></script>
   (aus einem Unterordner) oder <script src="design.js"></script>
   (aus dem Root)
════════════════════════════════════════════════════════ */

const DARK_DEFAULT  = 'dunkel';
const LIGHT_DEFAULT = 'licht';

/* Panel öffnen/schließen */
function togglePanel() {
  document.getElementById('design-panel').classList.toggle('open');
}

/* Außerhalb klicken schließt Panel */
document.addEventListener('click', function(e) {
  const panel = document.getElementById('design-panel');
  const btn   = document.querySelector('.design-btn');
  if (panel && btn && panel.classList.contains('open') &&
      !panel.contains(e.target) && !btn.contains(e.target)) {
    panel.classList.remove('open');
  }
});

/* Hell/Dunkel umschalten */
function toggleMode() {
  const mode = document.documentElement.getAttribute('data-mode');
  applyTheme(mode === 'dark' ? LIGHT_DEFAULT : DARK_DEFAULT,
             mode === 'dark' ? 'light' : 'dark');
}

/* Theme anwenden */
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

/* Theme-Button geklickt */
function setTheme(btn) {
  applyTheme(btn.dataset.theme, btn.dataset.mode);
}

/* Gespeichertes Theme beim Laden wiederherstellen */
(function() {
  try {
    const t = localStorage.getItem('lernapp-theme');
    const m = localStorage.getItem('lernapp-mode');
    if (t && m) applyTheme(t, m);
  } catch(e) {}
})();
