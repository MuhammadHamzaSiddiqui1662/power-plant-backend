import { NextFunction, Request, Response } from "express";

export interface CustomRequest extends Request {
    user?: any;
}

export type CustomRequestHandler = (req: CustomRequest, res: Response, next?: NextFunction) => Promise<void | Response>