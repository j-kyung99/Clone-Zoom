const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const socket = new WebSocket(`ws://${window.location.host}`);
// 여기에서의 socket은 서버로의 연결을 의미

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
}); // 서버가 연결되었을 때 발생

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
}); // 서버로 부터 메세지를 받을 때 발생

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
}); // 서버로 부터 연결이 끊겨을 때 발생

// 여긴 frontend!!

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
