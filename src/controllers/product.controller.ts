import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error";
import { NewProductRequestBody } from "../types/types";
import { Product } from "../models/product.model";

export const newProduct = TryCatch(
  async (
    req: Request<{}, {}, NewProductRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, price, stock, category } = req.body;

    const photo = req.file;

    const product = await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo?.path,
    });

    if (!product) throw Error();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  }
);
