import express from "express";
import { logInformation } from "middlewares/logger.middleware";

//Config in tsconfig.json
import { pingGroup } from "@group/controllers/group.controller.ts";

const groupRouter = express.Router();

groupRouter.use(logInformation);

groupRouter.get("/ping", pingGroup);

export default groupRouter;
