import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  newUser,
} from "../controllers/user.controller";

const app = express.Router();

app.post("/new", newUser);

app.get("/all", getAllUsers);

// app.get("/:id", getUser);
// app.get("/:id", deleteUser);  2 routes are same thats why we can chain it

app.route("/:id").get(getUser).delete(deleteUser);

export default app;
