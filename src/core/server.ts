import { Express, Router } from "express";
import { Db } from "mongodb";

import { initializeApp } from "./app";
import { initializeMongoDB } from "./database";

class Server {
  app: Express;
  mongodb: Db | null = null;

  constructor() {
    this.app = initializeApp();
    this.mongodb = initializeMongoDB();
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
