import express from "express";
import mongoose from "mongoose";
import { newCoupon } from "../controllers/payment.controller";

const app = express.Router();

// @route   POST /api/v1/payment/coupon/new
app.post("/coupon/new", newCoupon);

export default app;
