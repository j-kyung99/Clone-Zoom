const socket = io(); // socketIO를 front-end와 연결

/* const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

const socket = new WebSocket(`ws://${window.location.host}`);
// 여기에서의 socket은 서버로의 연결을 의미

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
}); // 서버가 연결되었을 때 발생

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
}); // 서버로 부터 메세지를 받을 때 발생

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
}); // 서버로 부터 연결이 끊겨을 때 발생

// 여긴 frontend!!

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
websocket을 이용하여 만든 부분 */
