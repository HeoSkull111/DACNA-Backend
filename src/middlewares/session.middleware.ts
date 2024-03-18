import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const { session_id } = req.cookies;

  req.sessionStore.get(session_id, (err, sessionData) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    console.log(sessionData);

    if (!sessionData) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  });
};
