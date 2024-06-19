import { body, query } from "express-validator";

export const validateGetGroup = [
  query("id").isString().notEmpty().withMessage("Group id is required"),
];

export const validateGetGroups = [query("page").default(1), query("limit").default(5)];

export const validateCreateGroup = [
  body("name")
    .isString()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 255 })
    .withMessage("Name must be between 3 and 255 characters long"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 8, max: 255 })
    .withMessage("Description must be between 8 and 255 characters long"),
];

export const validateUpdateGroup = [
  query("id").isString().notEmpty().withMessage("Group id is required"),
  body("name")
    .isString()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 255 })
    .withMessage("Name must be between 3 and 255 characters long"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 8, max: 255 })
    .withMessage("Description must be between 8 and 255 characters long"),
];

export const validateDeleteGroup = [
  query("id").isString().notEmpty().withMessage("Group id is required"),
];

export const validateListMembers = [
  query("group_id")
    .isString()
    .notEmpty()
    .withMessage("Group id is required")
    .isLength({ min: 24, max: 24 })
    .withMessage("Group id must be 24 characters long"),
  query("page").default(1).isInt().withMessage("Page must be a number"),
  query("limit").default(10).isInt().withMessage("Limit must be a number"),
];

export const validateGetMember = [
  query("group_id")
    .isString()
    .notEmpty()
    .withMessage("Group id is required")
    .isLength({ min: 24, max: 24 })
    .withMessage("Group id must be 24 characters long"),
  query("member_id")
    .isString()
    .notEmpty()
    .withMessage("Member id is required")
    .isLength({ min: 24, max: 24 })
    .withMessage("Member id must be 24 characters long"),
];

export const validateGetCurrentMember = [
  query("group_id")
    .isString()
    .notEmpty()
    .withMessage("Group id is required")
    .isLength({ min: 24, max: 24 })
    .withMessage("Group id must be 24 characters long"),
];

export const validateAddMember = [
  body("group_id")
    .isString()
    .notEmpty()
    .withMessage("Group id is required")
    .isLength({ min: 24, max: 24 })
    .withMessage("Group id must be 24 characters long"),
  body("member_ids")
    .notEmpty()
    .withMessage("Member ids is required")
    .isArray()
    .withMessage("Member ids must be an array"),
];

export const validateDeleteMember = [
  query("group_id")
    .isString()
    .notEmpty()
    .withMessage("Group id is required")
    .isLength({ min: 24, max: 24 })
    .withMessage("Group id must be 24 characters long"),
  query("member_id")
    .isString()
    .notEmpty()
    .withMessage("Member id is required")
    .isLength({ min: 24, max: 24 })
    .withMessage("Member id must be 24 characters long"),
];

export const validateIsMember = [
  query("group_id")
    .isString()
    .notEmpty()
    .withMessage("Group id is required")
    .isLength({ min: 24, max: 24 })
    .withMessage("Group id must be 24 characters long"),
  query("member_id")
    .isString()
    .notEmpty()
    .withMessage("Member id is required")
    .isLength({ min: 24, max: 24 })
    .withMessage("Member id must be 24 characters long"),
];
