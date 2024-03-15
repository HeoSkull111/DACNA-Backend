import express from "express";
import { logInformation } from "@middlewares/logger.middleware";

//Validating the user input
import { validateRegisterUserForm, validateLoginUserForm } from "./validations/user.validation";

//Config in tsconfig.json
import { loginUser, registerUser } from "@user/controllers/user.controller.ts";

const userRouter = express.Router();

userRouter.use(logInformation);

userRouter.post("/register", validateRegisterUserForm, registerUser);
userRouter.post("/login", validateLoginUserForm, loginUser);

export default userRouter;
