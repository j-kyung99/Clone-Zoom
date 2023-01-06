const socket = io(); // socketIO를 front-end와 연결

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  // argument의 개수는 원하는 만큼 가능, 어떠한 것이든 상관 없음
  // 특정한 event를 emit (어떤 이름이든 상관 X), JS 오브젝트를 전송할 수 있음
  // 마지막 argument에는 서버에서 호출하는 function이 들어감(원할때만, 항상 넣어야되는건 X)
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

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
