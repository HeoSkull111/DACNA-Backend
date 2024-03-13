import express from "express";

import { logInformation } from "@middlewares/logger.middleware";

//Config in tsconfig.json
import { pingWorkday } from "@workday/controllers/workday.controller.ts";

const workdayRouter = express.Router();

workdayRouter.use(logInformation);

workdayRouter.get("/ping", pingWorkday);

export default workdayRouter;
