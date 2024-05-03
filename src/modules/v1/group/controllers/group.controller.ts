import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";

import { HttpResponse } from "src/models/http-reponse";

//businesses
import groupBusiness from "@group/businesses/group.business";

//models
import { CreateGroupForm, UpdateGroupForm } from "@group/models/group.model";

export const getGroup = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const { id } = matchedData(req);

  try {
    const groupResult = await groupBusiness.getGroup(id);

    const response: HttpResponse = {
      status: 200,
      message: "Group found",
      error: null,
      data: groupResult,
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

export const listMembers = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0] });
  }

  const { page, limit, group_id } = matchedData(req);

  try {
    const listGroups = await groupBusiness.listMembers(page, limit, group_id?.toString() || "");

    const response: HttpResponse = {
      status: 200,
      message: "List members",
      error: null,
      data: listGroups,
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

  res.send("List members");
};

export const createGroup = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const createGroupForm = matchedData(req) as CreateGroupForm;

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
    const resultGroup = await groupBusiness.createGroup(createGroupForm, user_id);

    const response: HttpResponse = {
      status: 201,
      message: "Group created",
      error: null,
      data: resultGroup,
    };

    res.status(response.status).json(response);
  } catch (error: any) {
    const response: HttpResponse = {
      status: 400,
      message: "Group already exists",
      error: error.message,
      data: null,
    };

    res.status(response.status).json(response);
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const updateGroupForm = matchedData(req) as UpdateGroupForm;

  try {
    const resultGroup = await groupBusiness.updateGroup(updateGroupForm);

    const response: HttpResponse = {
      status: 200,
      message: "Group updated",
      error: null,
      data: resultGroup,
    };

    res.status(response.status).json(response);
  } catch (error: any) {
    const response: HttpResponse = {
      status: 400,
      message: "Group not found",
      error: error.message,
      data: null,
    };

    res.status(response.status).json(response);
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
  }

  const { id } = matchedData(req);

  try {
    groupBusiness.deleteGroup(id);

    const response: HttpResponse = {
      status: 200,
      message: "Group deleted",
      error: null,
      data: null,
    };

    res.status(response.status).json(response);
  } catch (error: any) {
    const response: HttpResponse = {
      status: 400,
      message: "Group not found",
      error: error.message,
      data: null,
    };

    res.status(response.status).json(response);
  }
};
