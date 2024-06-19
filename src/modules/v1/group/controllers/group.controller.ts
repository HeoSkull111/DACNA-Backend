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

export const getGroups = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0] });
  }

  const { page, limit } = matchedData(req);
  const user_id = req.session.user!.id;

  try {
    const listGroups = await groupBusiness.listGroups(page, limit, user_id);

    const response: HttpResponse = {
      status: 200,
      message: "List groups",
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
};

export const isMember = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0] });
  }

  const { group_id, member_id } = matchedData(req);

  try {
    const isMember = await groupBusiness.isMember(group_id, member_id);

    const response: HttpResponse = {
      status: 200,
      message: "Member found",
      error: null,
      data: isMember,
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

export const getMember = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0] });
  }

  const { group_id, member_id } = matchedData(req);

  try {
    const member = await groupBusiness.getMember(group_id, member_id);

    const response: HttpResponse = {
      status: 200,
      message: "Member found",
      error: null,
      data: member,
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

export const getCurrentMember = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0] });
  }

  const { group_id } = matchedData(req);
  const user_id = req.session.user!.id;

  if (!user_id) {
    const response: HttpResponse = {
      status: 401,
      message: "Unauthorized",
      error: "User not logged in",
      data: null,
    };

    return res.status(response.status).json(response);
  }

  try {
    const member = await groupBusiness.getMember(group_id, user_id);

    const response: HttpResponse = {
      status: 200,
      message: "Member found",
      error: null,
      data: member,
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

export const addMembers = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0] });
  }

  const { group_id, member_ids } = matchedData(req) as { group_id: string; member_ids: string[] };

  try {
    await groupBusiness.addMembers(group_id, member_ids);

    const response: HttpResponse = {
      status: 201,
      message: "Members added",
      error: null,
      data: null,
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

export const deleteMember = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0] });
  }

  const { group_id, member_id } = matchedData(req);

  const user_id = req.session.user!.id;

  if (!user_id) {
    const response: HttpResponse = {
      status: 401,
      message: "Unauthorized",
      error: "User not logged in",
      data: null,
    };

    return res.status(response.status).json(response);
  }

  try {
    await groupBusiness.deleteMember(user_id, group_id, member_id);

    const response: HttpResponse = {
      status: 200,
      message: "Member deleted",
      error: null,
      data: null,
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
