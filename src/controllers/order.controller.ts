import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error";
import { newOrderRequestBody } from "../types/types";

export const newOrder = TryCatch(
  async (
    req: Request<{}, {}, newOrderRequestBody>,
    res: Response,
    next: NextFunction
  ) => {}
);
