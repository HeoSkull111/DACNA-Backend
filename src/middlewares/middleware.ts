import { Request, Response, Handler, NextFunction } from "express";

// This middleware is used to exclude certain routes from the middleware
export const excludeRoute = (middleware: Handler, ...paths: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const pathCheck = paths.some((path) => path === req.url);
    pathCheck ? next() : middleware(req, res, next);
  };
};
