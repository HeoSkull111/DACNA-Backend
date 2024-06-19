import express from "express";

//middlewares
import { logInformation } from "@middlewares/logger.middleware";
import { isAuthenticated } from "@middlewares/session.middleware";

//validations
import {
  validateGetGroup,
  validateGetGroups,
  validateListMembers,
  validateCreateGroup,
  validateUpdateGroup,
  validateDeleteGroup,
  validateGetMember,
  validateGetCurrentMember,
  validateAddMember,
  validateIsMember,
  validateDeleteMember,
} from "@group/validations/group.validation.ts";

//controllers
import {
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  listMembers,
  getMember,
  getGroups,
  getCurrentMember,
  addMembers,
  isMember,
  deleteMember,
} from "@group/controllers/group.controller.ts";

const groupRouter = express.Router();

groupRouter.use(logInformation);
groupRouter.use(isAuthenticated);

//routes
groupRouter.get("/detail", validateGetGroup, getGroup);
groupRouter.get("/list", validateGetGroups, getGroups);
groupRouter.get("/member", validateGetMember, getMember);
groupRouter.post("/is-member", validateIsMember, isMember);
groupRouter.post("/add-members", validateAddMember, addMembers);
groupRouter.delete("/delete-member", validateDeleteMember, deleteMember);
groupRouter.get("/current-member", validateGetCurrentMember, getCurrentMember);
groupRouter.get("/list-members", validateListMembers, listMembers);
groupRouter.post("/create", validateCreateGroup, createGroup);
groupRouter.put("/:id", validateUpdateGroup, updateGroup);
groupRouter.delete("/:id", validateDeleteGroup, deleteGroup);

export default groupRouter;
