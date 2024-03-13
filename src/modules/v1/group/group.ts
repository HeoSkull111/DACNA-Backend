import express from "express";
import { logInformation } from "@middlewares/logger.middleware";

//Config in tsconfig.json
import { listMembers } from "@group/controllers/group.controller.ts";

const groupRouter = express.Router();

//middlewares
groupRouter.use(logInformation);

//routes
groupRouter.get("/list", listMembers);

export default groupRouter;
