import express from "express";
import { adminOnly } from "../middlewares/auth";
import { allOrders, myOrders, newOrder } from "../controllers/order.controller";

const app = express.Router();

// /api/v1/order/new
app.post("/new", newOrder);

// /api/v1/order/my
app.get("/my", myOrders);

// /api/v1/order/all
app.get("/all", adminOnly, allOrders);

export default app;
