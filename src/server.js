import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express(); // 애플리케이션 생성

app.set("view engine", "pug"); // pug로 view engine 설정
app.set("views", __dirname + "/views"); // express에 template이 어디 있는지 지정
app.use("/public", express.static(__dirname + "/public")); // public url을 생성해서 유저에게 파일 공유
app.get("/", (req, res) => res.render("home")); // home.pug를 render 해주는 route handler 생성
app.get("/*", (req, res) => res.redirect("/")); // 유저가 어떤 url로 이동하던지 home으로 돌려보냄
const handleListen = () => console.log("Listening on http://localhost:3000");
//  app.listen(3000, handleListen); // 3000포트로 접속 성공 시 ~

const server = http.createServer(app); // server에 접근할 수 있음(http 서버)
const wss = new WebSocket.Server({ server }); // http 서버 위에 webSocket 서버를 만들 수 있도록 함

function handleConnection(socket) {
  console.log(socket);
  // 여기에서의 socket은 연결된 브라우저를 의미
}
wss.on("connection", handleConnection);

server.listen(3000, handleListen);
