const DEMO_USER = Object.freeze({
  username: "admin",
  password: "admin",
  displayName: "Administrador",
});

const STORAGE_KEYS = Object.freeze({
  session: "flexacademy.session",
  state: "flexacademy.state",
});

const courses = [
  {
    id: "fullstack-dotnet-react",
    title: "Full Stack con C#.NET y React",
    type: "stem",
    level: "Intermedio",
    progress: 74,
    description: "APIs, Entity Framework Core, componentes reutilizables y despliegue en Azure.",
  },
  {
    id: "machine-learning",
    title: "Machine Learning Aplicado",
    type: "stem",
    level: "Inicial",
    progress: 35,
    description: "Modelos supervisados, evaluacion, sesgos y uso responsable de IA.",
  },
  {
    id: "azure-cloud",
    title: "Cloud Computing con Azure",
    type: "stem",
    level: "Inicial",
    progress: 42,
    description: "Azure Functions, Cosmos DB, almacenamiento, seguridad y costos.",
  },
  {
    id: "cybersecurity",
    title: "Ciberseguridad y Privacidad",
    type: "stem",
    level: "Intermedio",
    progress: 51,
    description: "OAuth 2.0, gestion de datos, riesgos, cumplimiento y respuesta a incidentes.",
  },
  {
    id: "accessibility",
    title: "Accesibilidad para Educacion Digital",
    type: "career",
    level: "Avanzado",
    progress: 92,
    description: "Diseno inclusivo, lectores de pantalla, navegacion por teclado y WCAG.",
  },
  {
    id: "leadership",
    title: "Liderazgo y Gestion de Equipos",
    type: "career",
    level: "Inicial",
    progress: 28,
    description: "Comunicacion, resolucion de conflictos y seguimiento de proyectos.",
  },
];

const recommendations = {
  software: {
    label: "Desarrollo de Software",
    message: "Tu ruta ideal empieza con Full Stack con C#.NET y React, seguido de Cloud Computing con Azure.",
    action: "Inscribirte en Full Stack",
  },
  ai: {
    label: "Inteligencia Artificial",
    message: "Te conviene iniciar con Machine Learning Aplicado y reforzar etica de IA antes de modelos avanzados.",
    action: "Completar modulo de IA",
  },
  cloud: {
    label: "Cloud Computing",
    message: "La ruta recomendada combina Cloud Computing con Azure, seguridad OAuth 2.0 y costos de infraestructura.",
    action: "Revisar laboratorio Azure",
  },
  security: {
    label: "Ciberseguridad",
    message: "Empieza por Ciberseguridad y Privacidad, luego suma laboratorios de autenticacion y cumplimiento.",
    action: "Practicar OAuth 2.0",
  },
  data: {
    label: "Analisis de Datos",
    message: "Te sugiero una ruta de analisis de datos con SQL/NoSQL, visualizacion y fundamentos estadisticos.",
    action: "Abrir laboratorio SQL",
  },
  accessibility: {
    label: "Educacion Inclusiva",
    message: "Tu ruta debe priorizar Accesibilidad para Educacion Digital y pruebas con usuarios reales.",
    action: "Validar accesibilidad",
  },
};

const defaultState = Object.freeze({
  enrolledCourseIds: [],
  completedCourseIds: [],
  notices: ["Bienvenido al panel admin de FlexAcademy."],
  selectedTrack: null,
  weeklyProgress: 68,
  alerts: 0,
  assessmentScore: null,
  lastSimulation: null,
  certificateHash: null,
});

const state = loadState();

const elements = {
  loginScreen: document.querySelector("#loginScreen"),
  appShell: document.querySelector("#appShell"),
  loginForm: document.querySelector("#loginForm"),
  usernameInput: document.querySelector("#usernameInput"),
  passwordInput: document.querySelector("#passwordInput"),
  rememberInput: document.querySelector("#rememberInput"),
  fillDemoButton: document.querySelector("#fillDemoButton"),
  loginError: document.querySelector("#loginError"),
  activeUserLabel: document.querySelector("#activeUserLabel"),
  logoutButton: document.querySelector("#logoutButton"),
  courseGrid: document.querySelector("#courseGrid"),
  filterButtons: document.querySelectorAll("[data-filter]"),
  navLinks: document.querySelectorAll(".nav a"),
  largeTextToggle: document.querySelector("#largeTextToggle"),
  contrastToggle: document.querySelector("#contrastToggle"),
  diagnosticForm: document.querySelector("#diagnosticForm"),
  trackSelect: document.querySelector("#trackSelect"),
  levelRange: document.querySelector("#levelRange"),
  assessmentForm: document.querySelector("#assessmentForm"),
  assessmentAnswer: document.querySelector("#assessmentAnswer"),
  assessmentScore: document.querySelector("#assessmentScore"),
  assessmentFeedback: document.querySelector("#assessmentFeedback"),
  weeklyProgress: document.querySelector("#weeklyProgress"),
  enrolledMetric: document.querySelector("#enrolledMetric"),
  alertMetric: document.querySelector("#alertMetric"),
  currentTrackLabel: document.querySelector("#currentTrackLabel"),
  nextActionLabel: document.querySelector("#nextActionLabel"),
  chatForm: document.querySelector("#chatForm"),
  chatInput: document.querySelector("#chatInput"),
  chatLog: document.querySelector("#chatLog"),
  forumList: document.querySelector("#forumList"),
  simulationStatus: document.querySelector("#simulationStatus"),
  immersiveLab: document.querySelector(".immersive-lab"),
  verifyCertificateButton: document.querySelector("#verifyCertificateButton"),
  certificateHash: document.querySelector("#certificateHash"),
  resourceGrid: document.querySelector(".resource-grid"),
  noticeForm: document.querySelector("#noticeForm"),
  noticeInput: document.querySelector("#noticeInput"),
  noticeList: document.querySelector("#noticeList"),
};

const assessmentFeedback = {
  correct: {
    score: 96,
    message: "Respuesta excelente. La personalizacion por datos es el centro del aprendizaje adaptativo.",
  },
  partial: {
    score: 62,
    message: "Respuesta parcial. El contenido comun puede servir de base, pero falta adaptacion individual.",
  },
  incorrect: {
    score: 35,
    message: "Necesita refuerzo. La retroalimentacion inmediata es clave para mejorar retencion y progreso.",
  },
};

const simulationMessages = {
  accessibility: "Escenario accesible iniciado: practica navegacion por teclado, lectura asistida y contraste.",
  cloud: "Arquitectura cloud iniciada: revisa Azure Functions, Cosmos DB y escalabilidad por demanda.",
  security: "Practica de seguridad iniciada: valida OAuth 2.0, privacidad de datos y control de acceso.",
};

const resourceMessages = {
  accessibility: "Recurso abierto: guia WCAG para validar contraste, foco visible y lectores de pantalla.",
  plan: "Recurso abierto: plantilla semanal con bloques de estudio, practica y retroalimentacion.",
  data: "Recurso abierto: laboratorio de SQL/NoSQL para consultas, indices y datos en la nube.",
  interview: "Recurso abierto: simulacion de entrevista tecnica con preguntas de C#.NET, IA y Azure.",
};

function loadState() {
  try {
    const savedState = JSON.parse(localStorage.getItem(STORAGE_KEYS.state));
    return { ...defaultState, ...savedState };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEYS.state, JSON.stringify(state));
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.session));
  } catch {
    return null;
  }
}

function setSession(username, remember) {
  const session = {
    username,
    displayName: DEMO_USER.displayName,
    signedInAt: new Date().toISOString(),
  };

  if (remember) {
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
    return;
  }

  sessionStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.session);
  sessionStorage.removeItem(STORAGE_KEYS.session);
}

function getActiveSession() {
  return getSession() || JSON.parse(sessionStorage.getItem(STORAGE_KEYS.session) || "null");
}

function setAuthenticated(session) {
  document.body.classList.toggle("is-authenticated", Boolean(session));
  document.body.classList.toggle("is-locked", !session);
  elements.appShell.setAttribute("aria-hidden", session ? "false" : "true");

  if (session) {
    elements.activeUserLabel.textContent = session.displayName || session.username;
    renderApp();
    drawLearningMap();
    return;
  }

  elements.usernameInput.focus();
}

function validateCredentials(username, password) {
  return username === DEMO_USER.username && password === DEMO_USER.password;
}

function createElement(tagName, options = {}) {
  const element = document.createElement(tagName);

  if (options.className) element.className = options.className;
  if (options.text) element.textContent = options.text;
  if (options.type) element.type = options.type;
  if (options.ariaLabel) element.setAttribute("aria-label", options.ariaLabel);
  if (options.dataset) {
    Object.entries(options.dataset).forEach(([key, value]) => {
      element.dataset[key] = value;
    });
  }

  return element;
}

function renderApp() {
  renderCourses(getActiveFilter());
  renderMetrics();
  renderNotices();
}

function getActiveFilter() {
  const activeButton = [...elements.filterButtons].find((button) => button.classList.contains("active"));
  return activeButton?.dataset.filter || "all";
}

function renderMetrics() {
  const selected = state.selectedTrack ? recommendations[state.selectedTrack] : null;

  elements.weeklyProgress.textContent = `${state.weeklyProgress}%`;
  elements.enrolledMetric.textContent = String(state.enrolledCourseIds.length);
  elements.alertMetric.textContent = String(state.alerts);
  elements.currentTrackLabel.textContent = selected?.label || "Sin diagnostico";
  elements.nextActionLabel.textContent = selected?.action || "Completar diagnostico";
  elements.assessmentScore.textContent = state.assessmentScore ? `${state.assessmentScore}%` : "Sin evaluar";
  elements.certificateHash.textContent = state.certificateHash || "Hash pendiente de generacion.";
  elements.simulationStatus.textContent = state.lastSimulation
    ? simulationMessages[state.lastSimulation]
    : "Selecciona un escenario para iniciar la practica.";
}

function renderCourses(filter = "all") {
  const visibleCourses = filter === "all" ? courses : courses.filter((course) => course.type === filter);
  elements.courseGrid.replaceChildren(...visibleCourses.map(createCourseCard));
}

function createCourseCard(course) {
  const isEnrolled = state.enrolledCourseIds.includes(course.id);
  const isCompleted = state.completedCourseIds.includes(course.id);
  const card = createElement("article", {
    className: `course-card${isEnrolled ? " is-enrolled" : ""}`,
  });

  const tag = createElement("span", { className: "tag", text: course.level });
  const title = createElement("strong", { text: course.title });
  const description = createElement("p", { text: course.description });
  const progress = createElement("div", {
    className: "progress",
    ariaLabel: `Progreso ${course.progress}%`,
  });
  const progressBar = createElement("span");
  const actions = createElement("div", { className: "course-actions" });
  const enrollButton = createElement("button", {
    className: "button secondary",
    text: isEnrolled ? "Inscrito" : "Inscribirme",
    type: "button",
    dataset: { action: "enroll", courseId: course.id },
  });
  const completeButton = createElement("button", {
    className: "button primary",
    text: isCompleted ? "Completado" : "Completar",
    type: "button",
    dataset: { action: "complete", courseId: course.id },
  });

  progressBar.style.width = `${course.progress}%`;
  enrollButton.disabled = isEnrolled;
  completeButton.disabled = isCompleted;
  progress.append(progressBar);
  actions.append(enrollButton, completeButton);
  card.append(tag, title, description, progress, actions);

  return card;
}

function updateCourse(action, courseId) {
  if (action === "enroll" && !state.enrolledCourseIds.includes(courseId)) {
    state.enrolledCourseIds.push(courseId);
    state.alerts += 1;
    addChatMessage("Tutor", "Curso inscrito. Te sugiero reservar 25 minutos para el primer modulo.");
  }

  if (action === "complete" && !state.completedCourseIds.includes(courseId)) {
    state.completedCourseIds.push(courseId);
    state.weeklyProgress = Math.min(100, state.weeklyProgress + 5);
    addChatMessage("Tutor", "Excelente avance. Actualice tu progreso semanal y desbloquee la siguiente practica.");
  }

  saveState();
  renderApp();
}

function addChatMessage(author, message) {
  const line = createElement("p");
  const strong = createElement("strong", { text: `${author}:` });
  line.append(strong, ` ${message}`);
  elements.chatLog.appendChild(line);
  elements.chatLog.scrollTop = elements.chatLog.scrollHeight;
}

function renderNotices() {
  if (!state.notices.length) {
    elements.noticeList.replaceChildren(createElement("p", { text: "No hay avisos activos." }));
    return;
  }

  const notices = state.notices.map((notice, index) => {
    const item = createElement("div", { className: "notice-item" });
    const text = createElement("span", { text: notice });
    const button = createElement("button", {
      text: "Eliminar",
      type: "button",
      dataset: { noticeIndex: String(index) },
    });

    item.append(text, button);
    return item;
  });

  elements.noticeList.replaceChildren(...notices);
}

function drawLearningMap() {
  const canvas = document.querySelector("#learningMap");
  if (!canvas) return;

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

elements.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = elements.usernameInput.value.trim();
  const password = elements.passwordInput.value;

  if (!validateCredentials(username, password)) {
    elements.loginError.textContent = "Usuario o clave incorrectos.";
    elements.passwordInput.value = "";
    elements.passwordInput.focus();
    return;
  }

  elements.loginError.textContent = "";
  setSession(username, elements.rememberInput.checked);
  setAuthenticated(getActiveSession());
});

elements.fillDemoButton.addEventListener("click", () => {
  elements.usernameInput.value = DEMO_USER.username;
  elements.passwordInput.value = DEMO_USER.password;
  elements.loginError.textContent = "";
});

elements.logoutButton.addEventListener("click", () => {
  clearSession();
  setAuthenticated(null);
});

elements.filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    elements.filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderCourses(button.dataset.filter);
  });
});

elements.navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    elements.navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

elements.largeTextToggle.addEventListener("change", () => {
  document.body.classList.toggle("large-text", elements.largeTextToggle.checked);
});

elements.contrastToggle.addEventListener("change", () => {
  document.body.classList.toggle("high-contrast", elements.contrastToggle.checked);
});

elements.diagnosticForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedTrack = elements.trackSelect.value;
  const level = Number(elements.levelRange.value);
  const boost = Math.min(96, 52 + level * 8);

  state.selectedTrack = selectedTrack;
  state.weeklyProgress = boost;
  saveState();
  renderMetrics();
  addChatMessage("Tutor", recommendations[selectedTrack].message);
  document.querySelector("#tutor").scrollIntoView({ behavior: "smooth", block: "start" });
});

elements.assessmentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedAnswer = elements.assessmentAnswer.value;
  const result = assessmentFeedback[selectedAnswer];

  if (!result) {
    elements.assessmentFeedback.textContent = "Selecciona una respuesta para calcular el puntaje.";
    return;
  }

  state.assessmentScore = result.score;
  state.weeklyProgress = Math.min(100, Math.round((state.weeklyProgress + result.score) / 2));
  state.alerts += result.score >= 80 ? 0 : 1;
  elements.assessmentFeedback.textContent = result.message;
  saveState();
  renderMetrics();
  addChatMessage("Tutor", result.message);
});

elements.chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = elements.chatInput.value.trim();
  if (!question) return;

  addChatMessage("Tu", question);
  elements.chatInput.value = "";
  addChatMessage(
    "Tutor",
    "Buena pregunta. Para avanzar hoy, completa una practica corta, revisa la retroalimentacion y agenda una evaluacion dinamica de 10 minutos.",
  );
});

elements.courseGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  updateCourse(button.dataset.action, button.dataset.courseId);
});

elements.forumList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-topic]");
  if (!button) return;
  addChatMessage("Tutor", `Te conecte con la comunidad: ${button.dataset.topic}.`);
  document.querySelector("#tutor").scrollIntoView({ behavior: "smooth", block: "start" });
});

elements.immersiveLab.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-simulation]");
  if (!button) return;

  state.lastSimulation = button.dataset.simulation;
  elements.simulationStatus.textContent = simulationMessages[state.lastSimulation];
  saveState();
  addChatMessage("Tutor", simulationMessages[state.lastSimulation]);
});

elements.verifyCertificateButton.addEventListener("click", () => {
  const seed = `${DEMO_USER.username}-${Date.now()}-${state.completedCourseIds.length}`;
  const hash = Array.from(seed)
    .reduce((total, char) => (total * 31 + char.charCodeAt(0)) >>> 0, 2166136261)
    .toString(16)
    .padStart(8, "0")
    .toUpperCase();

  state.certificateHash = `FXA-${hash}-VERIFY`;
  saveState();
  renderMetrics();
  addChatMessage("Tutor", `Certificado verificado con codigo ${state.certificateHash}.`);
});

elements.resourceGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-resource]");
  if (!button) return;

  const message = resourceMessages[button.dataset.resource];
  addChatMessage("Tutor", message);
  document.querySelector("#tutor").scrollIntoView({ behavior: "smooth", block: "start" });
});

elements.noticeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const notice = elements.noticeInput.value.trim();
  if (!notice) return;

  state.notices.unshift(notice);
  elements.noticeInput.value = "";
  saveState();
  renderNotices();
});

elements.noticeList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-notice-index]");
  if (!button) return;

  state.notices.splice(Number(button.dataset.noticeIndex), 1);
  saveState();
  renderNotices();
});

window.addEventListener("resize", drawLearningMap);
setAuthenticated(getActiveSession());
