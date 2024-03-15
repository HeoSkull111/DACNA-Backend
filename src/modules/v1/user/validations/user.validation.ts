import { body } from "express-validator";

export const validateRegisterUserForm = [
  body("email").trim().isEmail(),
  body("password").isLength({ min: 5 }),
  body("first_name").isString(),
  body("last_name").isString(),
];

export const validateLoginUserForm = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];
