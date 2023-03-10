const socket = io(); // socketIO를 front-end와 연결

const welcome = document.getElementById("welcome");
const room = document.getElementById("room");
const entrance = document.getElementById("entrance");

room.hidden = true;

let roomName, nickName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = welcome.querySelector("#name input");
  socket.emit("nickname", input.value);
}

function showRoom(newCount) {
  entrance.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  const msgForm = room.querySelector("#msg");
  const nameForm = welcome.querySelector("#name");
  msgForm.addEventListener("submit", handleMessageSubmit);
  nameForm.addEventListener("submit", handleNicknameSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const roomInput = entrance.querySelector("input");
  const nickInput = welcome.querySelector("#name input");
  socket.emit("enter_room", roomInput.value, nickInput.value, showRoom);
  // argument의 개수는 원하는 만큼 가능, 어떠한 것이든 상관 없음
  // 특정한 event를 emit (어떤 이름이든 상관 X), JS 오브젝트를 전송할 수 있음
  // 마지막 argument에는 서버에서 호출하는 function이 들어감(원할때만, 항상 넣어야되는건 X)
  roomName = roomInput.value;
  nickName = nickInput.value;
  roomInput.value = "";
  nickInput.value = "";
}

entrance.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} arrived!`);
});

socket.on("bye", (left, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${left} left ㅠㅠ`);
});

socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});

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
