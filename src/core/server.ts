import { Express, Router } from "express";

import { initializeApp } from "./app";

class Server {
  app: Express;

  constructor() {
    this.app = initializeApp();
  }

  loadRouters(routers: Router[]) {
    for (const [key, value] of Object.entries(routers)) {
      this.app.use(`api/v1/${key}`, value);
    }
  }

  run() {
    this.app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  }
}

export function createServer() {
  return new Server();
}
