import express from "express";

import { adminOnly } from "../middlewares/auth";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getLatestProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/product.controller";
import { singleUpload } from "../middlewares/multer";

const app = express.Router();

//To Create new product - /api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);

//To get latest product - /api/v1/product/latest
app.get("/latest", getLatestProducts);

//To get all unique categories - /api/v1/product/categories
app.get("/categories", getAllCategories);

//To get all products - /api/v1/product/admin-products
app.get("/admin-products", getAdminProducts);

app
  .route("/:id")
  .get(getSingleProduct)
  .put(singleUpload, updateProduct)
  .delete(deleteProduct);

export default app;
