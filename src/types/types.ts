import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
  name: String;
  email: string;
  photo: String;
  gender: String;
  role: String;
  _id: String;
  dob: Date;
}

export interface NewProductRequestBody {
  name: String;
  category: string;
  price: number;
  stock: number;
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;
