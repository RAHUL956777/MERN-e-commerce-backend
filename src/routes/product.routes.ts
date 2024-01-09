import express from "express";

import { adminOnly } from "../middlewares/auth";
import { newProduct } from "../controllers/product.controller";
import { singleUpload } from "../middlewares/multer";

const app = express.Router();

app.post("/new", singleUpload, newProduct);

export default app;
