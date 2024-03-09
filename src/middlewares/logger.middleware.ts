import { Request, Response, NextFunction } from "express";

export const logInformation = (req: Request, res: Response, next: NextFunction) => {
  //Console log time, method, and URL of the request
  const currentDate = new Date();

  //Convert the date to a string UTC +7
  const TimeString = currentDate.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

  //Log the information with color
  console.log("\x1b[36m%s\x1b[0m", `[${TimeString}] ${req.method} ${req.originalUrl} ${req.ip} `);

  next();
};
