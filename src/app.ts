import express, { urlencoded } from "express";
import { connectDB } from "./utils/features";
import { errorMiddleWare } from "./middlewares/error";

// importing routes
import userRoute from "./routes/user.routes";
import productRoute from "./routes/product.routes";

const PORT = 8000;
connectDB();

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API working with /api/v1");
});

// ushing user routes routes
app.use("/api/v1/user", userRoute);

// ushing product routes
app.use("/api/v1/product", productRoute);

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleWare);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
