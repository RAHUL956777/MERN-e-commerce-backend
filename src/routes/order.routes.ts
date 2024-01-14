import express from "express";
import { adminOnly } from "../middlewares/auth";
import { newOrder } from "../controllers/order.controller";

const app = express.Router();

// /api/v1/order/new
app.post("/new", newOrder);

export default app;
