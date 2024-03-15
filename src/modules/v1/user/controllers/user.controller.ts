import { Request, Response } from "express";
import { HttpResponse } from "src/models/http-reponse";
import { matchedData, validationResult } from "express-validator";

import userBusiness from "@user/businesses/user.business";

import { LoginUserForm, RegisterUserForm } from "@user/models/user.model";

export const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = matchedData(req) as RegisterUserForm;
  try {
    const ID = await userBusiness.registerUser(user);

    const response: HttpResponse = {
      status: 201,
      message: "User registered",
      error: null,
      data: {
        id: ID,
      },
    };

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

export const loginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = matchedData(req) as LoginUserForm;

  try {
    const ID = await userBusiness.loginUser(user);

    const response: HttpResponse = {
      status: 200,
      message: "User Logged in",
      error: null,
      data: {
        id: ID,
      },
    };

    res.status(response.status).json(response);
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
