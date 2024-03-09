import { Request, Response } from "express";

export const pingWorkday = (req: Request, res: Response) => {
  res.send("Pong");
};
