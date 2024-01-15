import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error";
import { newOrderRequestBody } from "../types/types";
import { Order } from "../models/order.model";
import { invalidateCache, reduceStock } from "../utils/features";
import ErrorHandler from "../utils/utilityClass";
import { myCache } from "../app";

export const newOrder = TryCatch(
  async (
    req: Request<{}, {}, newOrderRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    } = req.body;

    if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total)
      return next(new ErrorHandler("Please Enter All Fields", 400));

    await Order.create({
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    });

    await reduceStock(orderItems);

    await invalidateCache({ product: true, order: true, admin: true });

    return res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
    });
  }
);

export const myOrders = TryCatch(async (req, res, next) => {
  const { id: user } = req.query;
  const key = `my-orders${user}`;
  let orders = [];
  if (myCache.has(key)) orders = JSON.parse(myCache.get(key) as string);
  else {
    orders = await Order.find({ user });
    myCache.set(key, JSON.stringify(orders));
  }

  return res.status(200).json({
    success: true,
    orders,
  });
});

export const allOrders = TryCatch(async (req, res, next) => {
  const key = `all-orders`;
  let orders = [];

  if (myCache.has(key)) orders = JSON.parse(myCache.get(key) as string);
  else {
    orders = await Order.find().populate("");
    myCache.set(key, JSON.stringify(orders));
  }
  return res.status(200).json({
    success: true,
    orders,
  });
});
