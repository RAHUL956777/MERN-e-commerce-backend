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
  category: String;
  price: number;
  stock: number;
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type SearchRequestQuery = {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
};

export interface BaseQuery {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: { $lte: number };
  category?: string;
}
