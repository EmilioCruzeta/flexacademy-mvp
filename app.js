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
    modules: ["Fundamentos C#.NET", "APIs con Entity Framework", "React y componentes", "Despliegue en Azure"],
    quiz: {
      question: "Que pieza conecta la API con SQL Server en esta ruta?",
      answer: "Entity Framework Core",
    },
  },
  {
    id: "machine-learning",
    title: "Machine Learning Aplicado",
    type: "stem",
    level: "Inicial",
    progress: 35,
    description: "Modelos supervisados, evaluacion, sesgos y uso responsable de IA.",
    modules: ["Datos de entrenamiento", "Modelos supervisados", "Evaluacion de precision", "Etica y sesgos"],
    quiz: {
      question: "Que practica ayuda a medir si un modelo generaliza bien?",
      answer: "Evaluacion de precision",
    },
  },
  {
    id: "azure-cloud",
    title: "Cloud Computing con Azure",
    type: "stem",
    level: "Inicial",
    progress: 42,
    description: "Azure Functions, Cosmos DB, almacenamiento, seguridad y costos.",
    modules: ["Servicios cloud", "Azure Functions", "Cosmos DB", "Costos y escalabilidad"],
    quiz: {
      question: "Que servicio permite ejecutar logica serverless en Azure?",
      answer: "Azure Functions",
    },
  },
  {
    id: "cybersecurity",
    title: "Ciberseguridad y Privacidad",
    type: "stem",
    level: "Intermedio",
    progress: 51,
    description: "OAuth 2.0, gestion de datos, riesgos, cumplimiento y respuesta a incidentes.",
    modules: ["Principios de seguridad", "OAuth 2.0", "Privacidad de datos", "Respuesta a incidentes"],
    quiz: {
      question: "Que protocolo se usa para autorizacion segura en esta ruta?",
      answer: "OAuth 2.0",
    },
  },
  {
    id: "accessibility",
    title: "Accesibilidad para Educacion Digital",
    type: "career",
    level: "Avanzado",
    progress: 92,
    description: "Diseno inclusivo, lectores de pantalla, navegacion por teclado y WCAG.",
    modules: ["WCAG", "Lectores de pantalla", "Navegacion por teclado", "Pruebas inclusivas"],
    quiz: {
      question: "Que guia se usa para validar accesibilidad web?",
      answer: "WCAG",
    },
  },
  {
    id: "leadership",
    title: "Liderazgo y Gestion de Equipos",
    type: "career",
    level: "Inicial",
    progress: 28,
    description: "Comunicacion, resolucion de conflictos y seguimiento de proyectos.",
    modules: ["Comunicacion efectiva", "Resolucion de conflictos", "Gestion de equipos", "Seguimiento de proyectos"],
    quiz: {
      question: "Que habilidad ayuda a manejar desacuerdos dentro de un equipo?",
      answer: "Resolucion de conflictos",
    },
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
  streakDays: 12,
  alerts: 0,
  assessmentScore: null,
  lastSimulation: null,
  certificateHash: null,
  activeCourseId: null,
  courseProgress: {},
  quizResults: {},
  courseActivity: {},
  lastActivity: null,
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
  learningPanel: document.querySelector("#learningPanel"),
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
  streakMetric: document.querySelector("#streakMetric"),
  enrolledMetric: document.querySelector("#enrolledMetric"),
  averageProgressMetric: document.querySelector("#averageProgressMetric"),
  alertMetric: document.querySelector("#alertMetric"),
  lastActivityLabel: document.querySelector("#lastActivityLabel"),
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
    return normalizeState(savedState);
  } catch {
    return normalizeState();
  }
}

function normalizeState(savedState = {}) {
  const merged = { ...defaultState, ...(savedState || {}) };
  const knownCourseIds = new Set(courses.map((course) => course.id));

  merged.enrolledCourseIds = [...new Set(merged.enrolledCourseIds || [])].filter((courseId) => knownCourseIds.has(courseId));
  merged.completedCourseIds = [...new Set(merged.completedCourseIds || [])].filter((courseId) => knownCourseIds.has(courseId));
  merged.notices = Array.isArray(merged.notices) ? merged.notices : [...defaultState.notices];
  merged.courseProgress = normalizeCourseProgress(merged.courseProgress || {}, merged.completedCourseIds);
  merged.quizResults = typeof merged.quizResults === "object" && merged.quizResults ? merged.quizResults : {};
  merged.courseActivity = typeof merged.courseActivity === "object" && merged.courseActivity ? merged.courseActivity : {};
  merged.streakDays = Number.isFinite(merged.streakDays) ? merged.streakDays : defaultState.streakDays;
  merged.weeklyProgress = Number.isFinite(merged.weeklyProgress) ? merged.weeklyProgress : defaultState.weeklyProgress;
  merged.alerts = Number.isFinite(merged.alerts) ? merged.alerts : defaultState.alerts;

  return merged;
}

function normalizeCourseProgress(progressByCourse, completedCourseIds) {
  return courses.reduce((progress, course) => {
    const savedModules = Array.isArray(progressByCourse[course.id]) ? progressByCourse[course.id] : [];
    const moduleIndexes = completedCourseIds.includes(course.id)
      ? course.modules.map((_, index) => index)
      : savedModules;

    progress[course.id] = [...new Set(moduleIndexes)]
      .filter((index) => Number.isInteger(index) && index >= 0 && index < course.modules.length)
      .sort((a, b) => a - b);
    return progress;
  }, {});
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
  renderLearningPanel();
  renderMetrics();
  renderNotices();
}

function getActiveFilter() {
  const activeButton = [...elements.filterButtons].find((button) => button.classList.contains("active"));
  return activeButton?.dataset.filter || "all";
}

function renderMetrics() {
  const selected = state.selectedTrack ? recommendations[state.selectedTrack] : null;
  const averageProgress = getAverageProgress();

  elements.weeklyProgress.textContent = `${state.weeklyProgress}%`;
  elements.streakMetric.textContent = `${state.streakDays} dias`;
  elements.enrolledMetric.textContent = String(state.enrolledCourseIds.length);
  elements.averageProgressMetric.textContent = `${averageProgress}%`;
  elements.alertMetric.textContent = String(state.alerts);
  elements.currentTrackLabel.textContent = selected?.label || getActiveCourseLabel();
  elements.nextActionLabel.textContent = selected?.action || getNextLearningAction();
  elements.lastActivityLabel.textContent = formatActivity(state.lastActivity);
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
  const progressValue = getCourseProgress(course.id);
  const quizResult = state.quizResults[course.id];
  const card = createElement("article", {
    className: `course-card${isEnrolled ? " is-enrolled" : ""}${isCompleted ? " is-completed" : ""}`,
  });

  const tag = createElement("span", { className: "tag", text: course.level });
  const title = createElement("strong", { text: course.title });
  const description = createElement("p", { text: course.description });
  const meta = createElement("div", { className: "course-meta" });
  const progress = createElement("div", {
    className: "progress",
    ariaLabel: `Progreso personal ${progressValue}%`,
  });
  const progressBar = createElement("span");
  const actions = createElement("div", { className: "course-actions" });
  const routeButton = createElement("button", {
    className: "button secondary",
    text: progressValue > 0 ? "Retomar" : "Ver ruta",
    type: "button",
    dataset: { action: "view", courseId: course.id },
  });
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

  meta.append(
    createElement("span", { text: `${progressValue}% avance` }),
    createElement("span", { text: `${getCompletedModules(course.id).length}/${course.modules.length} modulos` }),
    createElement("span", { text: quizResult?.passed ? "Quiz aprobado" : "Quiz pendiente" }),
  );

  progressBar.style.width = `${progressValue}%`;
  enrollButton.disabled = isEnrolled;
  completeButton.disabled = isCompleted;
  progress.append(progressBar);
  actions.append(routeButton, enrollButton, completeButton);
  card.append(tag, title, description, meta, progress, actions);

  return card;
}

function getCourseById(courseId) {
  return courses.find((course) => course.id === courseId);
}

function getCompletedModules(courseId) {
  return state.courseProgress[courseId] || [];
}

function getCourseProgress(courseId) {
  const course = getCourseById(courseId);
  if (!course) return 0;
  if (state.completedCourseIds.includes(courseId)) return 100;
  return Math.round((getCompletedModules(courseId).length / course.modules.length) * 100);
}

function getAverageProgress() {
  const trackedCourseIds = new Set([
    ...state.enrolledCourseIds,
    ...state.completedCourseIds,
    ...(state.activeCourseId ? [state.activeCourseId] : []),
  ]);

  if (!trackedCourseIds.size) return 0;
  const total = [...trackedCourseIds].reduce((sum, courseId) => sum + getCourseProgress(courseId), 0);
  return Math.round(total / trackedCourseIds.size);
}

function getActiveCourseLabel() {
  const activeCourse = getCourseById(state.activeCourseId);
  return activeCourse ? activeCourse.title : "Sin diagnostico";
}

function getNextLearningAction() {
  const activeCourse = getCourseById(state.activeCourseId);
  if (!activeCourse) return "Completar diagnostico";
  if (!state.enrolledCourseIds.includes(activeCourse.id)) return "Inscribirte en la ruta";
  if (getCourseProgress(activeCourse.id) < 100) return "Completar siguiente modulo";
  return state.quizResults[activeCourse.id]?.passed ? "Generar certificado" : "Validar quiz rapido";
}

function formatActivity(activity) {
  if (!activity?.at) return "Sin actividad";
  const date = new Date(activity.at);
  const formattedDate = Number.isNaN(date.getTime())
    ? "fecha reciente"
    : date.toLocaleDateString("es-DO", { month: "short", day: "numeric" });
  return `${activity.label} - ${formattedDate}`;
}

function markActivity(courseId, label) {
  const now = new Date();
  const previous = state.lastActivity?.at ? new Date(state.lastActivity.at) : null;

  if (previous && !Number.isNaN(previous.getTime())) {
    const previousDay = new Date(previous.getFullYear(), previous.getMonth(), previous.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffDays = Math.round((today - previousDay) / 86400000);

    if (diffDays === 1) state.streakDays += 1;
    if (diffDays > 1) state.streakDays = 1;
  }

  const activity = { courseId, label, at: now.toISOString() };
  state.lastActivity = activity;
  if (courseId) state.courseActivity[courseId] = activity;
}

function ensureCourseEnrollment(courseId) {
  if (!state.enrolledCourseIds.includes(courseId)) {
    state.enrolledCourseIds.push(courseId);
  }
}

function completeCourse(courseId) {
  const course = getCourseById(courseId);
  if (!course) return;

  ensureCourseEnrollment(courseId);
  state.courseProgress[courseId] = course.modules.map((_, index) => index);
  if (!state.completedCourseIds.includes(courseId)) {
    state.completedCourseIds.push(courseId);
  }
}

function renderLearningPanel() {
  const course = getCourseById(state.activeCourseId);

  if (!course) {
    const empty = createElement("div", { className: "empty-state" });
    empty.append(
      createElement("strong", { text: "Selecciona un curso" }),
      createElement("p", { text: "Usa el boton Ver ruta en el catalogo para cargar su contenido." }),
    );
    elements.learningPanel.replaceChildren(empty);
    return;
  }

  const completedModules = getCompletedModules(course.id);
  const progress = getCourseProgress(course.id);
  const header = createElement("div", { className: "learning-header" });
  const title = createElement("div");
  const moduleList = createElement("div", { className: "module-list" });
  const quiz = createElement("form", { className: "course-quiz" });
  const result = state.quizResults[course.id];
  const activity = state.courseActivity[course.id];

  title.append(
    createElement("span", { className: "tag", text: course.level }),
    createElement("h3", { text: course.title }),
    createElement("p", { text: course.description }),
  );

  const progressBlock = createElement("div", { className: "learning-progress" });
  const meter = createElement("div", { className: "progress", ariaLabel: `Progreso ${progress}%` });
  const meterBar = createElement("span");
  const resetButton = createElement("button", {
    className: "button secondary",
    text: "Reiniciar avance",
    type: "button",
    dataset: { action: "reset-progress", courseId: course.id },
  });
  meterBar.style.width = `${progress}%`;
  meter.append(meterBar);
  progressBlock.append(createElement("strong", { text: `${progress}%` }), meter, resetButton);
  header.append(title, progressBlock);

  const summary = createElement("div", { className: "learning-summary" });
  summary.append(
    createElement("span", { text: `${completedModules.length}/${course.modules.length} modulos completados` }),
    createElement("span", { text: result?.passed ? "Quiz aprobado" : "Quiz pendiente" }),
    createElement("span", { text: formatActivity(activity) }),
  );

  course.modules.forEach((moduleName, index) => {
    const isDone = completedModules.includes(index);
    const item = createElement("label", { className: "module-item" });
    const checkbox = createElement("input", {
      type: "checkbox",
      dataset: { moduleIndex: String(index), courseId: course.id },
    });
    checkbox.checked = isDone;
    item.append(checkbox, createElement("span", { text: moduleName }));
    moduleList.append(item);
  });

  const quizLabel = createElement("label");
  const quizInput = createElement("input", {
    type: "text",
  });
  quizInput.id = "courseQuizAnswer";
  quizInput.placeholder = course.quiz.answer;
  quizInput.autocomplete = "off";
  quizLabel.append(course.quiz.question, quizInput);
  quiz.append(
    createElement("strong", { text: "Quiz rapido" }),
    quizLabel,
    createElement("button", {
      className: "button primary",
      text: "Validar quiz",
      type: "submit",
      dataset: { courseId: course.id },
    }),
  );

  if (result) {
    const resultText = result.answeredAt ? `${result.message} Guardado ${formatActivity({ label: "quiz", at: result.answeredAt })}.` : result.message;
    quiz.append(createElement("p", { className: result.passed ? "quiz-pass" : "quiz-fail", text: resultText }));
  }

  elements.learningPanel.replaceChildren(header, summary, moduleList, quiz);
}

function updateCourse(action, courseId) {
  if (action === "view") {
    state.activeCourseId = courseId;
    markActivity(courseId, "Ruta abierta");
    saveState();
    renderApp();
    document.querySelector("#learning").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (action === "enroll" && !state.enrolledCourseIds.includes(courseId)) {
    ensureCourseEnrollment(courseId);
    state.activeCourseId = courseId;
    state.alerts += 1;
    markActivity(courseId, "Inscripcion registrada");
    addChatMessage("Tutor", "Curso inscrito. Te sugiero reservar 25 minutos para el primer modulo.");
  }

  if (action === "complete" && !state.completedCourseIds.includes(courseId)) {
    completeCourse(courseId);
    state.activeCourseId = courseId;
    state.weeklyProgress = Math.min(100, Math.max(state.weeklyProgress, getCourseProgress(courseId)));
    markActivity(courseId, "Curso completado");
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

elements.learningPanel.addEventListener("click", (event) => {
  const resetButton = event.target.closest("button[data-action='reset-progress']");
  if (!resetButton) return;

  const courseId = resetButton.dataset.courseId;
  state.courseProgress[courseId] = [];
  state.completedCourseIds = state.completedCourseIds.filter((id) => id !== courseId);
  delete state.quizResults[courseId];
  markActivity(courseId, "Avance reiniciado");
  saveState();
  renderApp();
});

elements.learningPanel.addEventListener("change", (event) => {
  const checkbox = event.target.closest("input[data-module-index]");
  if (!checkbox) return;

  const courseId = checkbox.dataset.courseId;
  const moduleIndex = Number(checkbox.dataset.moduleIndex);
  const completedModules = new Set(state.courseProgress[courseId] || []);

  ensureCourseEnrollment(courseId);
  checkbox.checked ? completedModules.add(moduleIndex) : completedModules.delete(moduleIndex);
  state.courseProgress[courseId] = [...completedModules].sort((a, b) => a - b);

  if (getCourseProgress(courseId) === 100 && state.quizResults[courseId]?.passed) {
    completeCourse(courseId);
  } else {
    state.completedCourseIds = state.completedCourseIds.filter((id) => id !== courseId);
  }

  state.weeklyProgress = Math.min(100, Math.max(state.weeklyProgress, getCourseProgress(courseId)));
  markActivity(courseId, checkbox.checked ? "Modulo completado" : "Modulo reabierto");
  saveState();
  renderApp();
});

elements.learningPanel.addEventListener("submit", (event) => {
  const form = event.target.closest(".course-quiz");
  if (!form) return;
  event.preventDefault();

  const courseId = form.querySelector("button[data-course-id]").dataset.courseId;
  const course = getCourseById(courseId);
  const answer = form.querySelector("#courseQuizAnswer").value.trim().toLowerCase();
  const expected = course.quiz.answer.toLowerCase();
  const passed = answer.length > 2 && (answer.includes(expected) || expected.includes(answer));

  ensureCourseEnrollment(courseId);
  state.quizResults[courseId] = {
    passed,
    answer: answer || "Sin respuesta",
    answeredAt: new Date().toISOString(),
    message: passed
      ? "Respuesta correcta. Quiz aprobado y guardado en tu progreso."
      : `Respuesta pendiente. Pista: revisa ${course.quiz.answer}.`,
  };

  if (passed && getCourseProgress(courseId) === 100) {
    completeCourse(courseId);
  }

  if (passed) {
    state.weeklyProgress = Math.min(100, Math.max(state.weeklyProgress, getCourseProgress(courseId), state.weeklyProgress + 4));
  }

  markActivity(courseId, passed ? "Quiz aprobado" : "Quiz intentado");
  saveState();
  renderApp();
  addChatMessage("Tutor", state.quizResults[courseId].message);
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
