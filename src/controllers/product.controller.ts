import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error";
import { NewProductRequestBody } from "../types/types";

export const newProduct = TryCatch(
  async (
    req: Request<{}, {}, NewProductRequestBody>,
    res: Response,
    next: NextFunction
  ) => {

    const {} = req.body;
  }
);
