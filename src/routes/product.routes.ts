import express from "express";

import { adminOnly } from "../middlewares/auth";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getAllProducts,
  getLatestProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/product.controller";
import { singleUpload } from "../middlewares/multer";

const app = express.Router();

//To Create new product - /api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);

// route for searching(get all products with filters)
app.get("/all", getAllProducts);

//To get latest product - /api/v1/product/latest
app.get("/latest", getLatestProducts);

//To get all unique categories - /api/v1/product/categories
app.get("/categories", getAllCategories);

//To get all products - /api/v1/product/admin-products
app.get("/admin-products", adminOnly, getAdminProducts);

app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, singleUpload, updateProduct)
  .delete(adminOnly, deleteProduct);

export default app;
