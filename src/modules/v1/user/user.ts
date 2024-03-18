import express from "express";

//middlewares
import { logInformation } from "@middlewares/logger.middleware";
import { isAuthenticated } from "@middlewares/session.middleware";

//Validating the user input
import { validateRegisterUserForm, validateLoginUserForm } from "./validations/user.validation";

//Config in tsconfig.json
import { registerUser, loginUser, logoutUser, test } from "@user/controllers/user.controller.ts";

const userRouter = express.Router();

userRouter.use(logInformation);

userRouter.get("/", isAuthenticated, test);
userRouter.post("/register", validateRegisterUserForm, registerUser);
userRouter.post("/login", validateLoginUserForm, loginUser);
userRouter.get("/logout", logoutUser);

export default userRouter;
