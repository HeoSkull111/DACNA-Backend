import { Request, Response } from "express";

export const pingGroup = (req: Request, res: Response) => {
  res.send("Pong");
};
