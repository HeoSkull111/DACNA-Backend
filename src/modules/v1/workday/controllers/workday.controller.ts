import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";

export const pingWorkday = (req: Request, res: Response) => {
  res.send("Pong");
};

export const checkIn = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const validData = matchedData(req);

  console.log(validData);

  res.send("Check in");
};

export const checkOut = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const validData = matchedData(req);

  console.log(validData);

  res.send("Check out");
};
