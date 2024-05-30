import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import mongodb from "../configs/mongodb.json";
import { User } from "@user/models/user.model";

declare module "express-session" {
  export interface SessionData {
    user: Omit<User, "password"> | null;
  }
}

export const initializeApp = () => {
  const app = express();

  app.use(
    cors({
      origin: ["http://localhost:4200"],
      credentials: true,
      optionsSuccessStatus: 204,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Origin", "Content-Type", "Authorization"],
      exposedHeaders: ["Content-Range", "X-Content-Range"],
      preflightContinue: true,
      maxAge: 3600,
    })
  );

  app.options("*", (_, res) => {
    res.sendStatus(200);
  });

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    session({
      secret: "ChamCongOnline",
      resave: false,
      saveUninitialized: false,
      rolling: true,
      store: MongoStore.create({
        mongoUrl: mongodb.connection_string,
        dbName: mongodb.database,
      }),
      cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
        httpOnly: true,
      },
    })
  );

  return app;
};
