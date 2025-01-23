import { NextFunction, Request, RequestHandler, Response } from "express";
import { z } from "zod";
import { registerSchema, loginSchema } from "../validations/auth.validation";

export const validateRegister: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    registerSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.issues });
      return;
    }
    next(error);
  }
};

export const validateLogin: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.issues });
      return;
    }
    next(error);
  }
};
