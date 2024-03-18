import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "src/models/http-reponse";
import { matchedData, validationResult } from "express-validator";

import userBusiness from "@user/businesses/user.business";

import { LoginUserForm, RegisterUserForm } from "@user/models/user.model";

export const test = (req: Request, res: Response) => {
  res.send("User Controller");
};

export const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = matchedData(req) as RegisterUserForm;

  try {
    const resultUser = await userBusiness.registerUser(user);

    const response: HttpResponse = {
      status: 201,
      message: "User registered",
      error: null,
      data: resultUser,
    };

    req.session.regenerate((err) => {
      if (err) {
        throw new Error("Error regenerating session");
      }

      req.session.user = resultUser;
    });

    res.status(response.status).json(response);
  } catch (error: any) {
    const response: HttpResponse = {
      status: 400,
      message: "User already exists",
      error: error.message,
      data: null,
    };

    res.status(response.status).json(response);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const user = matchedData(req) as LoginUserForm;

  if (req.session.user) {
    const response: HttpResponse = {
      status: 200,
      message: "User already logged in",
      error: null,
      data: req.session.user,
    };

    return res.status(response.status).json(response);
  }

  try {
    const resultUser = await userBusiness.loginUser(user);

    const response: HttpResponse = {
      status: 201,
      message: "User Logged in",
      error: null,
      data: resultUser,
    };

    req.session.regenerate((err) => {
      if (err) {
        throw new Error("Error regenerating session");
      }

      req.session.user = resultUser;

      req.session.save((err) => {
        if (err) {
          throw new Error("Error saving session");
        }
      });

      res.cookie("session_id", req.sessionID);
      res.status(response.status).json(response);
    });
  } catch (error: any) {
    const response: HttpResponse = {
      status: 401,
      message: "Invalid Password or Email",
      error: error.message,
      data: null,
    };

    res.status(response.status).json(response);
  }
};

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  const { session_id } = req.cookies;

  req.sessionStore.destroy(session_id, (err) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res.clearCookie("session_id");

    const response: HttpResponse = {
      status: 200,
      message: "User logged out",
      error: null,
      data: null,
    };

    res.status(response.status).json(response);
  });
};
