// ===== Preferencias persistidas =====
const LANG_STORAGE_KEY = 'seremas-lang';
const THEME_STORAGE_KEY = 'seremas-theme';

function getStoredLang() {
  try {
    return localStorage.getItem(LANG_STORAGE_KEY) || 'es';
  } catch (e) {
    return 'es';
  }
}

function setStoredLang(lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (e) {}
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {}
}

// ===== Datos de especialidades =====
// Textos e íconos extraídos de seremas.com/ (sección "Nuestras especialidades").
// Los nombres/descripciones viven en TRANSLATIONS (spec.<key>.name / .desc)
// para poder re-renderizar la grilla al cambiar de idioma.
const SPECIALTIES = [
  { key: 'medicinaReproductiva', icon: 'img/especialidades/01.png' },
  { key: 'ginecologia', icon: 'img/especialidades/02-1.png' },
  { key: 'urologia', icon: 'img/especialidades/03.png' },
  { key: 'endocrinologia', icon: 'img/especialidades/04.png' },
  { key: 'climaterioMasculino', icon: 'img/especialidades/05.png' },
  { key: 'psicologia', icon: 'img/especialidades/06.png' },
  { key: 'andrologia', icon: 'img/especialidades/07.png' },
  { key: 'sexologia', icon: 'img/especialidades/08.png' }
];

function renderSpecialties(lang) {
  const grid = document.getElementById('specialty-grid');
  if (!grid) return;

  lang = lang || getStoredLang();
  const dict = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[lang]) || {};
  const verMas = dict['specialties.verMas'] || 'Ver más';

  grid.innerHTML = SPECIALTIES.map((s) => {
    const name = dict[`spec.${s.key}.name`] || '';
    const desc = dict[`spec.${s.key}.desc`] || '';
    return `
    <article class="specialty-card">
      <div class="specialty-icon" aria-hidden="true">
        <span class="specialty-icon-fill" style="-webkit-mask-image:url('${s.icon}');mask-image:url('${s.icon}');"></span>
      </div>
      <h3>${name}</h3>
      <p>${desc}</p>
      <a class="specialty-link" href="#contacto" aria-label="${verMas}: ${name}">
        ${verMas}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6"/>
        </svg>
      </a>
    </article>
  `;
  }).join('');
}

// ===== Idioma (ES/EN) =====
function applyTranslations(lang) {
  if (typeof TRANSLATIONS === 'undefined') return;
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.es;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria-label');
    if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
  });

  document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'es-AR');
}

function updateLangToggleUI(lang) {
  const toggle = document.getElementById('lang-toggle');
  if (!toggle) return;
  toggle.querySelectorAll('.lang-option').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
  });
}

function setLanguage(lang) {
  setStoredLang(lang);
  applyTranslations(lang);
  renderSpecialties(lang);
  updateLangToggleUI(lang);
}

function setupLangToggle() {
  const toggle = document.getElementById('lang-toggle');
  if (!toggle) return;

  toggle.querySelectorAll('.lang-option').forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
  });
}

// ===== Modo oscuro =====
function setTheme(theme) {
  setStoredTheme(theme);
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

function setupThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  });
}

// ===== Menú móvil =====
function setupNavToggle() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Acordeón de preguntas frecuentes =====
function setupFaqAccordion() {
  const accordion = document.getElementById('faq-accordion');
  if (!accordion) return;

  const triggers = accordion.querySelectorAll('.accordion-trigger');

  triggers.forEach((trigger) => {
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!panel) return;

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      isOpen ? closePanel(trigger, panel) : openPanel(trigger, panel);
    });
  });

  // Evita que una transición pendiente (de un toggle anterior interrumpido)
  // pise el estado del toggle actual al togglear rápido.
  function clearPendingTransition(panel) {
    if (panel._pendingTransitionHandler) {
      panel.removeEventListener('transitionend', panel._pendingTransitionHandler);
      panel._pendingTransitionHandler = null;
    }
  }

  function openPanel(trigger, panel) {
    clearPendingTransition(panel);
    trigger.setAttribute('aria-expanded', 'true');
    panel.hidden = false;
    const targetHeight = panel.scrollHeight;
    panel.style.height = '0px';
    // Forzar reflow para que la transición desde 0 se aplique.
    panel.offsetHeight;
    panel.style.height = targetHeight + 'px';

    panel._pendingTransitionHandler = (e) => {
      if (e.propertyName !== 'height') return;
      panel.style.height = 'auto';
      panel._pendingTransitionHandler = null;
    };
    panel.addEventListener('transitionend', panel._pendingTransitionHandler, { once: true });
  }

  function closePanel(trigger, panel) {
    clearPendingTransition(panel);
    trigger.setAttribute('aria-expanded', 'false');
    panel.style.height = panel.scrollHeight + 'px';
    panel.offsetHeight;
    panel.style.height = '0px';

    panel._pendingTransitionHandler = (e) => {
      if (e.propertyName !== 'height') return;
      panel.hidden = true;
      panel._pendingTransitionHandler = null;
    };
    panel.addEventListener('transitionend', panel._pendingTransitionHandler, { once: true });
  }
}

// ===== Menú del botón flotante de WhatsApp =====
function setupWhatsappWidget() {
  const widget = document.getElementById('whatsapp-widget');
  const toggle = document.getElementById('whatsapp-toggle');
  const menu = document.getElementById('whatsapp-menu');
  const closeBtn = document.getElementById('whatsapp-menu-close');
  if (!widget || !toggle || !menu) return;

  function openMenu() {
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    const firstItem = menu.querySelector('.whatsapp-menu-item');
    if (firstItem) firstItem.focus();
  }

  function closeMenu({ focusToggle = false } = {}) {
    if (menu.hidden) return;
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (focusToggle) toggle.focus();
  }

  toggle.addEventListener('click', () => {
    if (menu.hidden) openMenu();
    else closeMenu();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeMenu({ focusToggle: true }));
  }

  menu.querySelectorAll('a.whatsapp-menu-item').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('click', (e) => {
    if (!widget.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) closeMenu({ focusToggle: true });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const lang = getStoredLang();
  renderSpecialties(lang);
  applyTranslations(lang);
  updateLangToggleUI(lang);

  setupLangToggle();
  setupThemeToggle();
  setupNavToggle();
  setupFaqAccordion();
  setupWhatsappWidget();
});
