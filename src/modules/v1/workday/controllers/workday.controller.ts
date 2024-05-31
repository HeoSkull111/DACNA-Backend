import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";

import workdayBusiness from "@workday/businesses/workday.business";

import { CreateWorkdayForm, UpdateWorkdayForm } from "@workday/models/workday.model";
import { HttpResponse } from "src/models/http-reponse";

export const checkIn = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const validData = matchedData(req) as CreateWorkdayForm;

  try {
    const resultWorkday = await workdayBusiness.addWorkday(validData);

    const response: HttpResponse = {
      status: 201,
      message: "Workday created",
      error: null,
      data: resultWorkday,
    };

    return res.status(response.status).send(response);
  } catch (error: any) {
    const response: HttpResponse = {
      status: 400,
      error: "Bad Request",
      message: error.message,
      data: null,
    };

    return res.status(response.status).send(response);
  }
};

export const checkOut = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const validData = matchedData(req) as UpdateWorkdayForm;

  try {
    const resultWorkday = workdayBusiness.updateWorkday(validData);

    const response: HttpResponse = {
      status: 200,
      message: "Workday updated",
      error: null,
      data: resultWorkday,
    };

    return res.status(response.status).send(response);
  } catch (error: any) {
    const response: HttpResponse = {
      status: 400,
      error: "Bad Request",
      message: error.message,
      data: null,
    };

    return res.status(response.status).send(response);
  }
};
