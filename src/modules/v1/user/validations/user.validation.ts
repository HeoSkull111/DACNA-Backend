import { body } from "express-validator";

export const validateRegisterUserForm = [
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
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long"),
  body("last_name")
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long"),
  body("photo_url").optional().isString().withMessage("Photo URL must be a string"),
  body("google_id").optional().isString().withMessage("Google ID must be a string"),
  body("github_id").optional().isString().withMessage("Github ID must be a string"),
];

export const validateLoginUserForm = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
];
