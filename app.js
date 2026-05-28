const courses = [
  {
    title: "Full Stack con C#.NET y React",
    type: "stem",
    level: "Intermedio",
    progress: 74,
    description: "APIs, Entity Framework Core, componentes reutilizables y despliegue en Azure.",
  },
  {
    title: "Machine Learning Aplicado",
    type: "stem",
    level: "Inicial",
    progress: 35,
    description: "Modelos supervisados, evaluacion, sesgos y uso responsable de IA.",
  },
  {
    title: "Cloud Computing con Azure",
    type: "stem",
    level: "Inicial",
    progress: 42,
    description: "Azure Functions, Cosmos DB, almacenamiento, seguridad y costos.",
  },
  {
    title: "Ciberseguridad y Privacidad",
    type: "stem",
    level: "Intermedio",
    progress: 51,
    description: "OAuth 2.0, gestion de datos, riesgos, cumplimiento y respuesta a incidentes.",
  },
  {
    title: "Accesibilidad para Educacion Digital",
    type: "career",
    level: "Avanzado",
    progress: 92,
    description: "Diseno inclusivo, lectores de pantalla, navegacion por teclado y WCAG.",
  },
  {
    title: "Liderazgo y Gestion de Equipos",
    type: "career",
    level: "Inicial",
    progress: 28,
    description: "Comunicacion, resolucion de conflictos y seguimiento de proyectos.",
  },
];

const recommendations = {
  software: "Tu ruta ideal empieza con Full Stack con C#.NET y React, seguido de Cloud Computing con Azure.",
  ai: "Te conviene iniciar con Machine Learning Aplicado y reforzar etica de IA antes de modelos avanzados.",
  cloud: "La ruta recomendada combina Cloud Computing con Azure, seguridad OAuth 2.0 y costos de infraestructura.",
  security: "Empieza por Ciberseguridad y Privacidad, luego suma laboratorios de autenticacion y cumplimiento.",
  data: "Te sugiero una ruta de analisis de datos con SQL/NoSQL, visualizacion y fundamentos estadisticos.",
  accessibility: "Tu ruta debe priorizar Accesibilidad para Educacion Digital y pruebas con usuarios reales.",
};

const courseGrid = document.querySelector("#courseGrid");
const filterButtons = document.querySelectorAll("[data-filter]");
const navLinks = document.querySelectorAll(".nav a");
const largeTextToggle = document.querySelector("#largeTextToggle");
const contrastToggle = document.querySelector("#contrastToggle");
const diagnosticForm = document.querySelector("#diagnosticForm");
const trackSelect = document.querySelector("#trackSelect");
const levelRange = document.querySelector("#levelRange");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const chatLog = document.querySelector("#chatLog");

function renderCourses(filter = "all") {
  const visibleCourses = filter === "all" ? courses : courses.filter((course) => course.type === filter);

  courseGrid.innerHTML = visibleCourses
    .map(
      (course) => `
        <article class="course-card">
          <span class="tag">${course.level}</span>
          <strong>${course.title}</strong>
          <p>${course.description}</p>
          <div class="progress" aria-label="Progreso ${course.progress}%">
            <span style="width: ${course.progress}%"></span>
          </div>
          <button class="button secondary" type="button">Ver ruta</button>
        </article>
      `,
    )
    .join("");
}

function addChatMessage(author, message) {
  const line = document.createElement("p");
  line.innerHTML = `<strong>${author}:</strong> ${message}`;
  chatLog.appendChild(line);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function drawLearningMap() {
  const canvas = document.querySelector("#learningMap");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const nodes = [
    { x: 92, y: 315, r: 42, label: "Acceso", color: "#38a169" },
    { x: 208, y: 146, r: 54, label: "Diagnostico", color: "#176b87" },
    { x: 362, y: 252, r: 62, label: "IA", color: "#d67a2c" },
    { x: 520, y: 124, r: 48, label: "VR/AR", color: "#c2415d" },
    { x: 576, y: 328, r: 46, label: "Cert.", color: "#334155" },
  ];

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#eef5f7";
  ctx.fillRect(0, 0, width, height);

  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(23, 107, 135, 0.25)";
  ctx.beginPath();
  ctx.moveTo(nodes[0].x, nodes[0].y);
  nodes.slice(1).forEach((node) => ctx.lineTo(node.x, node.y));
  ctx.stroke();

  nodes.forEach((node, index) => {
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 255, 255, 0.78)";
    ctx.arc(node.x + 10, node.y + 12, node.r + 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = node.color;
    ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 22px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.label, node.x, node.y);

    ctx.fillStyle = "#18202f";
    ctx.font = "800 20px Segoe UI, sans-serif";
    ctx.fillText(String(index + 1), node.x, node.y - node.r - 26);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderCourses(button.dataset.filter);
  });
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

largeTextToggle.addEventListener("change", () => {
  document.body.classList.toggle("large-text", largeTextToggle.checked);
});

contrastToggle.addEventListener("change", () => {
  document.body.classList.toggle("high-contrast", contrastToggle.checked);
});

diagnosticForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedTrack = trackSelect.value;
  const level = Number(levelRange.value);
  const boost = Math.min(96, 52 + level * 8);

  document.querySelector("#weeklyProgress").textContent = `${boost}%`;
  addChatMessage("Tutor", recommendations[selectedTrack]);
  document.querySelector("#tutor").scrollIntoView({ behavior: "smooth", block: "start" });
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (!question) return;

  addChatMessage("Tu", question);
  chatInput.value = "";
  addChatMessage(
    "Tutor",
    "Buena pregunta. Para avanzar hoy, completa una practica corta, revisa la retroalimentacion y agenda una evaluacion dinamica de 10 minutos.",
  );
});

renderCourses();
drawLearningMap();
window.addEventListener("resize", drawLearningMap);
