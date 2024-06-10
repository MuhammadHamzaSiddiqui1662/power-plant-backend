import { Request, Response } from "express";

export type CustomRequestHandler = (req: Request, res: Response) => Promise<void>