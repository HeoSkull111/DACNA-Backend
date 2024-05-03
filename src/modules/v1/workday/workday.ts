import express from "express";

//middlewares
import { logInformation } from "@middlewares/logger.middleware";
import { isAuthenticated } from "@middlewares/session.middleware";

//validations
import { validateCheckInForm, validateCheckOutForm } from "./validations/workday.validation";

//controllers
import { pingWorkday, checkIn, checkOut } from "@workday/controllers/workday.controller.ts";

const workdayRouter = express.Router();

workdayRouter.use(logInformation);
workdayRouter.use(isAuthenticated);

workdayRouter.get("/ping", pingWorkday);
workdayRouter.post("/check-in", validateCheckInForm, checkIn);
workdayRouter.post("/check-out", validateCheckOutForm, checkOut);

export default workdayRouter;
