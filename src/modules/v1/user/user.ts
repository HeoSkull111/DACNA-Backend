import express from "express";
import { logInformation } from "middlewares/logger.middleware";

//Config in tsconfig.json
import { pingUser } from "@user/controllers/user.controller.ts";

const userRouter = express.Router();

userRouter.use(logInformation);

userRouter.get("/ping", pingUser);

export default userRouter;
