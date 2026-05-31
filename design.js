/* ═══════════════════════════════════════════════════════
   LERNAPP — ZENTRALES DESIGN-JAVASCRIPT
   Einbinden: <script src="design.js"></script> (Root)
          oder <script src="../design.js"></script> (Unterordner)
════════════════════════════════════════════════════════ */

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

/* Hell/Dunkel umschalten —
   merkt sich das zuletzt genutzte Theme pro Modus */
function toggleMode() {
  const mode = document.documentElement.getAttribute('data-mode');
  if (mode === 'dark') {
    // Wechsel zu Hell — letztes helles Theme laden oder Standard
    const lastLight = localStorage.getItem('lernapp-last-light') || 'licht';
    applyTheme(lastLight, 'light');
  } else {
    // Wechsel zu Dunkel — letztes dunkles Theme laden oder Standard
    const lastDark = localStorage.getItem('lernapp-last-dark') || 'dunkel';
    applyTheme(lastDark, 'dark');
  }
}

/* Theme anwenden */
function applyTheme(theme, mode) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('data-mode',  mode);

  // Mond/Sonne Button aktualisieren
  const modeBtn = document.getElementById('mode-btn');
  if (modeBtn) modeBtn.textContent = mode === 'dark' ? '🌙' : '☀️';

  // Aktiven Theme-Button markieren
  document.querySelectorAll('.theme-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.theme === theme);
  });

  // Speichern
  try {
    localStorage.setItem('lernapp-theme', theme);
    localStorage.setItem('lernapp-mode',  mode);
    // Letztes Theme pro Modus merken
    if (mode === 'dark')  localStorage.setItem('lernapp-last-dark',  theme);
    if (mode === 'light') localStorage.setItem('lernapp-last-light', theme);
  } catch(e) {}
}

/* Theme-Button im Panel geklickt */
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
