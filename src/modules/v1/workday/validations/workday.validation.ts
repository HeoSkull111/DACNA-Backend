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
  body("check_in_at")
    .notEmpty()
    .withMessage("Check in time is required")
    .isInt()
    .withMessage("Check in time must be a number"),
];

export const validateCheckOutForm = [
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
  body("check_out_at")
    .notEmpty()
    .withMessage("Check out time is required")
    .isInt()
    .withMessage("Check out time must be a number"),
];
