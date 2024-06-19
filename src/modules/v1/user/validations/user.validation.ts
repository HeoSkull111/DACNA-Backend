import { body, query } from "express-validator";

export const validateUpdateUserForm = [
  body("username")
    .optional()
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 6, max: 20 })
    .withMessage("Username must be at least 6 characters long, and at most 20 characters long"),
  body("email").optional().isEmail().withMessage("Invalid email"),
  body("first_name")
    .optional()
    .isString()
    .withMessage("First name must be a string")
    .isLength({ min: 2, max: 20 })
    .withMessage("First name must be at least 2 characters long, and at most 20 characters long"),
  body("last_name")
    .optional()
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ min: 2, max: 30 })
    .withMessage("Last name must be at least 2 characters long, and at most 30 characters long"),
  body("phone")
    .optional()
    .isString()
    .withMessage("Phone number must be a string")
    .isLength({ min: 8 })
    .withMessage("Phone number must be at least 8 characters long"),
  body("photo_url").optional().isString().withMessage("Photo URL must be a string"),
];

export const validateRegisterUserForm = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 6 })
    .withMessage("Username must be at least 6 characters long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
  body("first_name")
    .isString()
    .withMessage("First name must be a string")
    .isLength({ min: 2, max: 10 })
    .withMessage("First name must be at least 2 characters long, and at most 10 characters long"),
  body("last_name")
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ min: 2, max: 20 })
    .withMessage("Last name must be at least 2 characters long, and at most 20 characters long"),
  body("phone")
    .optional()
    .isString()
    .withMessage("Phone number must be a string")
    .isLength({ min: 8 })
    .withMessage("Phone number must be at least 8 characters long"),
  body("photo_url").optional().isString().withMessage("Photo URL must be a string"),
];

export const validateLoginUserForm = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
];

export const validateSearchUserForm = [
  query("group_id")
    .notEmpty()
    .withMessage("Group ID is required")
    .isString()
    .withMessage("Group ID must be a string"),
  query("k").optional().isString().withMessage("Username must be a string"),
  query("e").optional().toArray(),
];
