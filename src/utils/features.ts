import mongoose from "mongoose";
import { InvalidateCacheProps } from "../types/types";
import { Product } from "../models/product.model";
import { myCache } from "../app";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce_2024", {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export const invalidateCache = async ({
  product,
  order,
  admin,
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];

    const products = await Product.find({}).select("_id");

    products.forEach((element) => {
      const id = `product-${element._id}`;
      productKeys.push(id);
    });

    myCache.del(productKeys);
  }

  if (order) {
  }
  if (admin) {
  }
};
