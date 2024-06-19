import { Request, Response } from "express";
import { HttpResponse } from "src/models/http-reponse";
import { matchedData, validationResult } from "express-validator";

// businesses
import userBusiness from "@user/businesses/user.business";

// models
import { LoginUserForm, RegisterUserForm, UpdateUserForm } from "@user/models/user.model";

export const getUser = async (req: Request, res: Response) => {
  const user = req.session.user;

  if (!user) {
    const response: HttpResponse = {
      status: 401,
      message: "User not logged in",
      error: null,
      data: null,
    };

    return res.status(response.status).json(response);
  }

  try {
    const resultUser = await userBusiness.getUser(user.id);

    const response: HttpResponse = {
      status: 200,
      message: "User found",
      error: null,
      data: resultUser,
    };

    res.status(response.status).json(response);
  } catch (error: any) {
    const response: HttpResponse = {
      status: 404,
      message: "User not found",
      error: error.message,
      data: null,
    };

    res.status(response.status).json(response);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const user = matchedData(req) as UpdateUserForm;

  if (!req.session.user) {
    const response: HttpResponse = {
      status: 401,
      message: "User not logged in",
      error: null,
      data: null,
    };

    return res.status(response.status).json(response);
  }

  try {
    const resultUser = await userBusiness.updateUser(req.session.user.id, user);

    const response: HttpResponse = {
      status: 200,
      message: "User updated",
      error: null,
      data: resultUser,
    };

    res.status(response.status).json(response);
  } catch (error: any) {
    const response: HttpResponse = {
      status: 400,
      message: "User not updated",
      error: error.message,
      data: null,
    };

    res.status(response.status).json(response);
  }
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
        console.log("Error regenerating session");
        throw new Error("Error regenerating session");
      }

      req.session.user = resultUser;
      res.status(response.status).json(response);
    });
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

export const searchUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const query = matchedData(req) as { group_id: string; k: string; e: string[] };

  const user_id = req.session.user?.id;

  if (!user_id) {
    const response: HttpResponse = {
      status: 401,
      message: "User not logged in",
      error: null,
      data: null,
    };

    return res.status(response.status).json(response);
  }

  try {
    const resultUser = await userBusiness.searchUser(user_id, query.group_id, query.k, query.e);

    const response: HttpResponse = {
      status: 200,
      message: "User found",
      error: null,
      data: resultUser,
    };

    res.status(response.status).json(response);
  } catch (error: any) {
    const response: HttpResponse = {
      status: 404,
      message: "User not found",
      error: error.message,
      data: null,
    };

    res.status(response.status).json(response);
  }
};

export const loginUser = async (req: Request, res: Response) => {
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
      status: 200,
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

      res.status(response.status).json(response);
    });
  } catch (error: any) {
    const response: HttpResponse = {
      status: 401,
      message: "Invalid Password or Username",
      error: error.message,
      data: null,
    };

    res.status(response.status).json(response);
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  const session_id = req.sessionID;

  req.sessionStore.destroy(session_id, (err) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const response: HttpResponse = {
      status: 200,
      message: "User logged out",
      error: null,
      data: null,
    };

    res.status(response.status).json(response);
  });
};

export const checkUser = async (req: Request, res: Response) => {
  const session_id = req.sessionID;

  req.sessionStore.get(session_id, (err, sessionData) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!sessionData) {
      const response: HttpResponse = {
        status: 401,
        message: "User not logged in",
        error: null,
        data: null,
      };

      return res.status(response.status).json(response);
    }

    const sessionCookieExpire = new Date(sessionData.cookie.expires!);

    if (sessionCookieExpire && sessionCookieExpire.getTime() < Date.now()) {
      req.sessionStore.destroy(session_id, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        res.clearCookie("session_id");

        const response: HttpResponse = {
          status: 401,
          message: "User not logged in",
          error: null,
          data: null,
        };

        return res.status(response.status).json(response);
      });
    }

    req.session.user = sessionData.user;

    const response: HttpResponse = {
      status: 200,
      message: "User logged in",
      error: null,
      data: sessionData.user,
    };

    res.status(response.status).json(response);
  });
};
