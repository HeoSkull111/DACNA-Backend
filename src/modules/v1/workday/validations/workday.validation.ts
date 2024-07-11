import { query } from "express-validator";

export const validateCheckInForm = [
  query("group_id").notEmpty().withMessage("Group id is required"),
];

export const validateCheckOutForm = [query("id").notEmpty().withMessage("Workday id is required")];

export const validateGetWorkdayForm = [
  query("id").notEmpty().withMessage("Workday id is required"),
];

export const validateGetWorkdaysForm = [
  query("group_id").notEmpty().withMessage("Group id is required"),
  query("user_id").notEmpty().withMessage("User id is required"),
  query("days").notEmpty().withMessage("Days is required"),
];

export const validateGetStatisticalWorkdaysForm = [
  query("group_id").notEmpty().withMessage("Group id is required"),
  query("user_id").notEmpty().withMessage("User id is required"),
  query("begin_date").optional().isISO8601().withMessage("Invalid date format"),
  query("end_date").optional().isISO8601().withMessage("Invalid date format"),
];
