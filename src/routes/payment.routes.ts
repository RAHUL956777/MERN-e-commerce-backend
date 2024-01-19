import express from "express";
import mongoose from "mongoose";
import {
  allCoupons,
  applyDiscount,
  deleteCoupons,
  newCoupon,
} from "../controllers/payment.controller";
import { adminOnly } from "../middlewares/auth";

const app = express.Router();

//@route POST /api/v1/payment/discount
app.post("/discount", applyDiscount);

// admin only routes

// @route   POST /api/v1/payment/coupon/new
app.post("/coupon/new", adminOnly, newCoupon);

//@route GET /api/v1/payment/coupon/all
app.get("/coupon/all", adminOnly, allCoupons);

//@route GET /api/v1/payment/coupon/:id
app.get("/coupon/:id", adminOnly, deleteCoupons);

export default app;
