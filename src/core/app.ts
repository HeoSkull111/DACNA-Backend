import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

export const initializeApp = () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  return app;
};
