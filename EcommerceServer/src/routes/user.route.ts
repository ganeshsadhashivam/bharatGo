import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/validation.middleware";

export const userRouter: Router = Router();
const userController = new UserController();

userRouter.post("/register", validateRegister, userController.register);
userRouter.post("/login", validateLogin, userController.login);
