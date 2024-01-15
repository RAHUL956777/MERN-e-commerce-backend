import mongoose from "mongoose";
import { InvalidateCacheProps, OrderItemType } from "../types/types";
import { Product } from "../models/product.model";
import { myCache } from "../app";

export const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri, {
      dbName: "ecommerce_2024",
    });
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

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);

    if (!product) throw new Error("Product Not Found");

    product.stock -= order.quantity;
    await product.save();
  }
};
