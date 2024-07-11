import express from "express";

//middlewares
import { logInformation } from "@middlewares/logger.middleware";
import { isAuthenticated } from "@middlewares/session.middleware";

//validations
import {
  validateCheckInForm,
  validateCheckOutForm,
  validateGetStatisticalWorkdaysForm,
  validateGetWorkdayForm,
  validateGetWorkdaysForm,
} from "./validations/workday.validation";

//controllers
import {
  checkIn,
  checkOut,
  getCurrentWorkday,
  getStatisticalWorkdays,
  getWorkday,
  getWorkdays,
} from "@workday/controllers/workday.controller.ts";

const workdayRouter = express.Router();

workdayRouter.use(logInformation);
workdayRouter.use(isAuthenticated);

workdayRouter.get("/", validateGetWorkdayForm, getWorkday);
workdayRouter.get("/by-date", validateGetWorkdaysForm, getWorkdays);
workdayRouter.get("/statistical", validateGetStatisticalWorkdaysForm, getStatisticalWorkdays);
workdayRouter.get("/current", getCurrentWorkday);
workdayRouter.post("/check-in", validateCheckInForm, checkIn);
workdayRouter.post("/check-out", validateCheckOutForm, checkOut);

export default workdayRouter;
