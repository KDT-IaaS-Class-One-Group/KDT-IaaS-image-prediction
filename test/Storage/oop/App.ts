// App.ts
import express from 'express';
import cors from 'cors';
import { StorageService } from './StorageService';

class App {
  public app: express.Application;
  private storageService: StorageService;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.storageService = new StorageService();

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(cors()); // CORS 미들웨어 사용
  }

  private initializeRoutes() {
    this.app.post("/api/upload", this.storageService.getUploader(), this.storageService.handleFileUpload.bind(this.storageService));
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`서버가 http://localhost:${this.port}에서 실행 중입니다.`);
    });
  }
}

export default App;
