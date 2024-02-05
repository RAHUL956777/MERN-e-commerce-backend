import express from "express";
import mongoose from "mongoose";
import {
  allCoupons,
  applyDiscount,
  createPaymentIntent,
  deleteCoupons,
  newCoupon,
} from "../controllers/payment.controller";
import { adminOnly } from "../middlewares/auth";

const app = express.Router();

//@route POST /api/v1/payment/create
app.post("/create", createPaymentIntent);

//@route POST /api/v1/payment/discount
app.get("/discount", applyDiscount);

// admin only routes

// @route   POST /api/v1/payment/coupon/new
app.post("/coupon/new", adminOnly, newCoupon);

//@route GET /api/v1/payment/coupon/all
app.get("/coupon/all", adminOnly, allCoupons);

//@route GET /api/v1/payment/coupon/:id
app.delete("/coupon/:id", adminOnly, deleteCoupons);

export default app;
