import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";

import workdayBusiness from "@workday/businesses/workday.business";

import { CreateWorkdayForm, UpdateWorkdayForm } from "@workday/models/workday.model";
import { HttpResponse } from "src/models/http-reponse";

export const checkIn = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array({ onlyFirstError: true }) });
  }

  const validData = matchedData(req) as CreateWorkdayForm;

  let user_id = "";

  if (!req.session.user) {
    const response: HttpResponse = {
      status: 401,
      message: "Unauthorized",
      error: "User not logged in",
      data: null,
    };

    return res.status(response.status).json(response);
  }

  user_id = req.session.user.id;

  try {
    const resultWorkday = await workdayBusiness.addWorkday(user_id, validData);

    const response: HttpResponse = {
      status: 201,
      message: "Workday created",
      error: null,
      data: resultWorkday,
    };

    console.log(response);

    return res.status(response.status).json(response);
  } catch (error: any) {
    console.log(error.message);

    const response: HttpResponse = {
      status: 400,
      error: "Bad Request",
      message: error.message,
      data: null,
    };

    return res.status(response.status).json(response);
  }
};

export const checkOut = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array({ onlyFirstError: true }) });
  }

  const validData = matchedData(req) as UpdateWorkdayForm;

  try {
    const resultWorkday = workdayBusiness.updateWorkday(validData.id);

    const response: HttpResponse = {
      status: 200,
      message: "Workday updated",
      error: null,
      data: resultWorkday,
    };

    return res.status(response.status).json(response);
  } catch (error: any) {
    const response: HttpResponse = {
      status: 400,
      error: "Bad Request",
      message: error.message,
      data: null,
    };

    return res.status(response.status).json(response);
  }
};

export const getWorkday = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const validData = matchedData(req) as { id: string };

  try {
    const resultWorkday = await workdayBusiness.getWorkday(validData.id);

    const response: HttpResponse = {
      status: 200,
      message: "Workday retrieved",
      error: null,
      data: resultWorkday,
    };

    return res.status(response.status).json(response);
  } catch (error: any) {
    const response: HttpResponse = {
      status: 400,
      error: "Bad Request",
      message: error.message,
      data: null,
    };

    return res.status(response.status).json(response);
  }
};

export const getCurrentWorkday = async (req: Request, res: Response) => {
  let user_id = "";

  if (!req.session.user) {
    const response: HttpResponse = {
      status: 401,
      message: "Unauthorized",
      error: "User not logged in",
      data: null,
    };

    return res.status(response.status).json(response);
  }

  user_id = req.session.user.id;

  try {
    const resultWorkday = await workdayBusiness.getCurrentWorkday(user_id);

    const response: HttpResponse = {
      status: 200,
      message: "Workday retrieved",
      error: null,
      data: resultWorkday,
    };

    return res.status(response.status).json(response);
  } catch (error: any) {
    const response: HttpResponse = {
      status: 400,
      error: "Bad Request",
      message: error.message,
      data: null,
    };

    return res.status(response.status).json(response);
  }
};

export const getWorkdays = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const validData = matchedData(req) as {
    group_id: string;
    user_id: string;
    days: string;
  };

  try {
    const resultWorkdays = await workdayBusiness.getWorkdays(
      validData.group_id,
      validData.user_id,
      validData.days
    );

    const response: HttpResponse = {
      status: 200,
      message: "Workdays retrieved",
      error: null,
      data: resultWorkdays,
    };

    return res.status(response.status).json(response);
  } catch (error: any) {
    const response: HttpResponse = {
      status: 400,
      error: "Bad Request",
      message: error.message,
      data: null,
    };

    return res.status(response.status).json(response);
  }
};

export const getStatisticalWorkdays = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const validData = matchedData(req) as {
    group_id: string;
    user_id: string;
    begin_date: string;
    end_date: string;
  };

  try {
    const resultWorkdays = await workdayBusiness.getStatisticalWorkdays(
      validData.group_id,
      validData.user_id,
      validData.begin_date,
      validData.end_date
    );

    const response: HttpResponse = {
      status: 200,
      message: "Workdays retrieved",
      error: null,
      data: resultWorkdays,
    };

    return res.status(response.status).json(response);
  } catch (error: any) {
    const response: HttpResponse = {
      status: 400,
      error: "Bad Request",
      message: error.message,
      data: null,
    };

    return res.status(response.status).json(response);
  }
};
