import express from "express";

//middlewares
import { logInformation } from "@middlewares/logger.middleware";
import { isAuthenticated } from "@middlewares/session.middleware";

//validations
import {
  validateGetGroup,
  validateListMembers,
  validateCreateGroup,
  validateUpdateGroup,
  validateDeleteGroup,
} from "@group/validations/group.validation.ts";

//controllers
import {
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  listMembers,
} from "@group/controllers/group.controller.ts";

const groupRouter = express.Router();

groupRouter.use(logInformation);
groupRouter.use(isAuthenticated);

//routes
groupRouter.get("/:id", validateGetGroup, getGroup);
groupRouter.get("/list", validateListMembers, listMembers);
groupRouter.post("/create", validateCreateGroup, createGroup);
groupRouter.put("/:id", validateUpdateGroup, updateGroup);
groupRouter.delete("/:id", validateDeleteGroup, deleteGroup);

export default groupRouter;
