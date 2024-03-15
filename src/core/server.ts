import { Express, Router } from "express";

import { initializeApp } from "./app";

type ServerRouter = Record<string, Router>;

class Server {
  app: Express;

  constructor() {
    this.app = initializeApp();
  }

  loadRouters(routers: ServerRouter) {
    for (const [key, value] of Object.entries(routers)) {
      this.app.use(`/api/v1/${key}`, value);
      console.log(`Router ${key} loaded at /api/v1/${key} with ${value.stack.length} routes`);
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
