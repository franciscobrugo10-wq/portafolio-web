// ===== Datos de especialidades =====
// Descripciones breves genéricas (no datos médicos/cifras) — reemplazar por
// contenido definitivo de la clínica si se desea mayor precisión.
const SPECIALTIES = [
  {
    name: "Medicina Reproductiva",
    desc: "Diagnóstico y tratamiento de la fertilidad para ayudarte a alcanzar tu proyecto de familia.",
    icon: `<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>`
  },
  {
    name: "Ginecología",
    desc: "Cuidado integral de la salud femenina en cada etapa de la vida.",
    icon: `<path d="M12 3v6"/><circle cx="12" cy="14" r="6"/><path d="M9 20h6"/>`
  },
  {
    name: "Urología",
    desc: "Diagnóstico y tratamiento de las afecciones del sistema urinario y reproductor masculino.",
    icon: `<path d="M8 3h8l-1 6a3 3 0 0 1-6 0L8 3Z"/><path d="M12 13v8"/>`
  },
  {
    name: "Endocrinología",
    desc: "Evaluación y tratamiento hormonal para tu salud reproductiva y general.",
    icon: `<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M21 12h-3M6 12H3M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7 5.6 5.6"/>`
  },
  {
    name: "Climaterio Masculino",
    desc: "Acompañamiento médico en los cambios hormonales propios de la edad adulta.",
    icon: `<circle cx="12" cy="9" r="5"/><path d="M12 14v7M9 18h6"/>`
  },
  {
    name: "Psicología",
    desc: "Contención emocional y acompañamiento psicológico durante todo el proceso.",
    icon: `<path d="M12 3a5 5 0 0 0-5 5c0 2 1 3 1 5v2h8v-2c0-2 1-3 1-5a5 5 0 0 0-5-5Z"/><path d="M9 19h6M10 22h4"/>`
  },
  {
    name: "Andrología",
    desc: "Diagnóstico y tratamiento de la salud reproductiva y sexual masculina.",
    icon: `<circle cx="10" cy="14" r="5"/><path d="M14 10l6-6M14 4h6v6"/>`
  },
  {
    name: "Sexología",
    desc: "Abordaje profesional de la salud y el bienestar sexual en pareja o de forma individual.",
    icon: `<path d="M12 21s-7-4.35-9.5-8.5C.7 8.9 2.4 5 6 5c2 0 3.5 1.2 4 2.5C10.5 6.2 12 5 14 5c3.6 0 5.3 3.9 3.5 7.5C19 16.65 12 21 12 21Z"/>`
  }
];

function renderSpecialties() {
  const grid = document.getElementById('specialty-grid');
  if (!grid) return;

  grid.innerHTML = SPECIALTIES.map((s) => `
    <article class="specialty-card">
      <div class="specialty-icon" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          ${s.icon}
        </svg>
      </div>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <a class="specialty-link" href="#contacto" aria-label="Ver más sobre ${s.name}">
        Ver más
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6"/>
        </svg>
      </a>
    </article>
  `).join('');
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

document.addEventListener('DOMContentLoaded', () => {
  renderSpecialties();
  setupNavToggle();
});
