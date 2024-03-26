// server.ts
import "dotenv/config";
import App from "./App";

const port = 5555; // 포트 설정
const app = new App(port);
app.listen();
