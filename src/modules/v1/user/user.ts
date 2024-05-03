import express from "express";

//middlewares
import { excludeRoute } from "@middlewares/middleware";
import { logInformation } from "@middlewares/logger.middleware";
import { isAuthenticated } from "@middlewares/session.middleware";

//validations
import { validateRegisterUserForm, validateLoginUserForm } from "./validations/user.validation";

//controllers
import {
  registerUser,
  loginUser,
  logoutUser,
  checkUser,
  getUser,
} from "@user/controllers/user.controller.ts";

const userRouter = express.Router();

userRouter.use(logInformation);
userRouter.use(excludeRoute(isAuthenticated, "/register", "/login", "/check-user"));

userRouter.get("/", getUser);
userRouter.post("/register", validateRegisterUserForm, registerUser);
userRouter.post("/login", validateLoginUserForm, loginUser);
userRouter.put("/logout", logoutUser);
userRouter.get("/check-user", checkUser);

export default userRouter;
