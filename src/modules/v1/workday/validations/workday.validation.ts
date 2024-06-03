import { query } from "express-validator";

export const validateCheckInForm = [
  query("group_id").notEmpty().withMessage("Group id is required"),
];

export const validateCheckOutForm = [query("id").notEmpty().withMessage("Workday id is required")];

export const validateGetWorkdayForm = [
  query("id").notEmpty().withMessage("Workday id is required"),
];
