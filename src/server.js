import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express(); // 애플리케이션 생성

app.set("view engine", "pug"); // pug로 view engine 설정
app.set("views", __dirname + "/views"); // express에 template이 어디 있는지 지정
app.use("/public", express.static(__dirname + "/public")); // public url을 생성해서 유저에게 파일 공유
app.get("/", (req, res) => res.render("home")); // home.pug를 render 해주는 route handler 생성
app.get("/*", (req, res) => res.redirect("/")); // 유저가 어떤 url로 이동하던지 home으로 돌려보냄
const handleListen = () => console.log("Listening on http://localhost:3000");
//  app.listen(3000, handleListen); // 3000포트로 접속 성공 시 ~

const httpServer = http.createServer(app); // server에 접근할 수 있음(http 서버)
const wsServer = SocketIO(httpServer);

function publicRooms() {
  const {
    sockets: {
      adpater: { sids, rooms },
    },
  } = wsServer;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

wsServer.on("connection", (socket) => {
  socket["nickname"] = "Anon";
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });
  socket.on("enter_room", (roomName, nickname, done) => {
    socket["nickname"] = nickname;
    if (nickname === "") {
      socket["nickname"] = "Anon";
    }
    socket.join(roomName);
    socket.to(roomName).emit("welcome", socket.nickname);
    done();
    /* setTimeout(() => {
      done("hello from the backend");
    }, 10000); // done function을 실행하면 back-end에서 코드를 실행시키는 것이 아님(front-end에서 실행 버튼을 눌러줌) */
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nickname)
    );
  });
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    done();
  });
  socket.on("nickname", (nickname) => {
    socket["nickname"] = nickname;
  });
}); // socketIO를 back-end와 연결

/* function handleConnection(socket) {
  console.log(socket);
  // 여기에서의 socket은 연결된 브라우저를 의미
} */

/* 
const wss = new WebSocket.Server({ server }); // http 서버 위에 webSocket 서버를 만들 수 있도록 함
const sockets = [];
wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anon";
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected from the Browser ❌"));
  socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
        break;
      case "nickname":
        socket["nickname"] = message.payload;
        break;
    }
  });
}); */

httpServer.listen(3000, handleListen);
