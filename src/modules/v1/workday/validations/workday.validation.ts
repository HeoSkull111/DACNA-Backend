import { body } from "express-validator";

export const validateCheckInForm = [
  body("group_id")
    .isString()
    .withMessage("Group id must be a string")
    .notEmpty()
    .withMessage("Group id is required")
    .isLength({ min: 12, max: 12 })
    .withMessage("Group id must be 12 characters long"),
  body("user_id")
    .isString()
    .withMessage("User id must be a string")
    .notEmpty()
    .withMessage("User id is required")
    .isLength({ min: 12, max: 12 })
    .withMessage("User id must be 12 characters long"),
];

export const validateCheckOutForm = [
  body("id")
    .isString()
    .withMessage("Workday id must be a string")
    .notEmpty()
    .withMessage("Workday id is required")
    .isLength({ min: 12, max: 12 })
    .withMessage("Workday id must be 12 characters long"),
  body("group_id")
    .isString()
    .withMessage("Group id must be a string")
    .notEmpty()
    .withMessage("Group id is required")
    .isLength({ min: 12, max: 12 })
    .withMessage("Group id must be 12 characters long"),
  body("user_id")
    .isString()
    .withMessage("User id must be a string")
    .notEmpty()
    .withMessage("User id is required")
    .isLength({ min: 12, max: 12 })
    .withMessage("User id must be 12 characters long"),
];
