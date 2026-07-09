const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let messageId = 0;

async function send(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++messageId;
    const onMessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id !== id) return;
      ws.removeEventListener("message", onMessage);
      message.error ? reject(new Error(JSON.stringify(message.error))) : resolve(message.result);
    };
    ws.addEventListener("message", onMessage);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(ws, expression) {
  const result = await send(ws, "Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  return result.result.value;
}

const tabs = await (await fetch("http://127.0.0.1:9223/json/list")).json();
const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);

await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));
await send(ws, "Page.enable");
await send(ws, "Runtime.enable");
await send(ws, "Page.navigate", { url: "http://127.0.0.1:4173/index.html" });
await delay(800);

await evaluate(
  ws,
  "localStorage.clear();" +
    "document.querySelector('#usernameInput').value = 'admin';" +
    "document.querySelector('#passwordInput').value = 'admin';" +
    "document.querySelector('#loginForm').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));",
);
await delay(300);

await evaluate(ws, "document.querySelector('button[data-action=\"view\"]').click();");
await delay(300);
await evaluate(ws, "document.querySelector('input[data-module-index=\"0\"]').click();");
await delay(200);
await evaluate(
  ws,
  "document.querySelector('#courseQuizAnswer').value = 'Entity Framework Core';" +
    "document.querySelector('.course-quiz').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));",
);
await delay(300);
await send(ws, "Page.reload");
await delay(800);

const result = await evaluate(
  ws,
  "JSON.stringify({" +
    "body: document.body.className," +
    "learningTitle: document.querySelector('.learning-header h3').textContent," +
    "modules: document.querySelectorAll('.module-item').length," +
    "checked: document.querySelectorAll('.module-item input:checked').length," +
    "quiz: document.querySelector('.quiz-pass, .quiz-fail').textContent," +
    "average: document.querySelector('#averageProgressMetric').textContent," +
    "lastActivity: document.querySelector('#lastActivityLabel').textContent," +
    "storedProgress: JSON.parse(localStorage.getItem('flexacademy.state')).courseProgress['fullstack-dotnet-react'].length," +
    "courses: document.querySelectorAll('.course-card').length" +
    "})",
);

ws.close();
console.log(result);
