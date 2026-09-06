// ===== Datos de especialidades =====
// Textos e íconos extraídos de seremas.com/ (sección "Nuestras especialidades").
const SPECIALTIES = [
  {
    name: "Medicina Reproductiva",
    desc: "Nuestro objetivo es preservar la fecundidad, diagnosticar y tratar la infertilidad y otros problemas reproductivos para lograr cumplir el sueño de tener un hijo.",
    icon: "img/especialidades/01.png"
  },
  {
    name: "Ginecología",
    desc: "Atención médica de la mujer durante su edad reproductiva, ya sea para el control, asesoramiento y eventual diagnóstico y tratamiento.",
    icon: "img/especialidades/02-1.png"
  },
  {
    name: "Urología",
    desc: "Las infecciones urinarias, las litiasis, la incontinencia urinaria y demás enfermedades urológicas deben ser diagnosticadas y tratadas.",
    icon: "img/especialidades/03.png"
  },
  {
    name: "Endocrinología",
    desc: "Profesionales asociados que se encargan del estudio de los problemas endocrinos del eje hipotálamo-hipófiso-gonadal, exceso de prolactina, como así también de las enfermedades de la tiroides, paratiroides y adrenales.",
    icon: "img/especialidades/04.png"
  },
  {
    name: "Climaterio Masculino",
    desc: "Atendemos a aquellos pacientes que en general han alcanzado los 50 años y que presentan algún síntoma que puede variar desde cierta disfunción sexual hasta cansancio generalizado.",
    icon: "img/especialidades/05.png"
  },
  {
    name: "Psicología",
    desc: "Fundamental debido al impacto que los problemas de la salud reproductiva ejercen sobre el área emocional de los pacientes.",
    icon: "img/especialidades/06.png"
  },
  {
    name: "Andrología",
    desc: "Disciplina médica que se aboca al estudio de los trastornos de la fertilidad y sexualidad del hombre. En otras palabras, se ocupa de la salud reproductiva masculina.",
    icon: "img/especialidades/07.png"
  },
  {
    name: "Sexología",
    desc: "El diagnóstico preciso sumado a tratamientos sexológicos y/o con medicación acorde a cada caso en especial, constituyen la respuesta más moderna y eficaz.",
    icon: "img/especialidades/08.png"
  }
];

function renderSpecialties() {
  const grid = document.getElementById('specialty-grid');
  if (!grid) return;

  grid.innerHTML = SPECIALTIES.map((s) => `
    <article class="specialty-card">
      <div class="specialty-icon" aria-hidden="true">
        <span class="specialty-icon-fill" style="-webkit-mask-image:url('${s.icon}');mask-image:url('${s.icon}');"></span>
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
