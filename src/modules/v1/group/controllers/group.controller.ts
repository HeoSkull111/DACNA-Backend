import { Request, Response } from "express";
import { HttpResponse } from "src/models/http-reponse";

import groupBusiness from "@group/businesses/group.business";

export const listMembers = (req: Request, res: Response) => {
  const { page = "1", limit = "10", groupID } = req.query;

  const pageInt = parseInt(page.toString());
  const limitInt = parseInt(limit.toString());

  try {
    groupBusiness.listMembers(pageInt, limitInt, groupID?.toString() || "");
  } catch (error: any) {
    const response: HttpResponse = {
      status: 400,
      error: "Bad Request",
      message: error.message,
      data: null,
    };

    return res.status(response.status).send(response);
  }

  res.send("List members");
};
