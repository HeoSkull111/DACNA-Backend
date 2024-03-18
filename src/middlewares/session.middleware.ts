import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const { session_id } = req.cookies;

  req.sessionStore.get(session_id, (err, sessionData) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!sessionData) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { expires } = sessionData.cookie;

    if (expires && expires.getTime() < Date.now()) {
      return res.status(401).json({ message: "Session Expired. Please Login Again" });
    }

    next();
  });
};
