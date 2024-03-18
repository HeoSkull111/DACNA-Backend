import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import mongodb from "../configs/mongodb.json";

export const initializeApp = () => {
  const app = express();

  app.use(cors());
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
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );

  return app;
};
