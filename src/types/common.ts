import { NextFunction, Request, Response } from "express";
import { User } from "../features/user/user.entity";

export interface CustomRequest<T = any> extends Request {
  user?: any;
  body: T;
}

export type CustomRequestHandler<T = any> = (
  req: CustomRequest<T>,
  res: Response,
  next?: NextFunction
) => Promise<void | Response>;
