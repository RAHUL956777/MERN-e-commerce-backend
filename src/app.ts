import express, { urlencoded } from "express";
import { connectDB } from "./utils/features";
import { errorMiddleWare } from "./middlewares/error";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";

// importing routes
import userRoute from "./routes/user.routes";
import productRoute from "./routes/product.routes";
import orderRoute from "./routes/order.routes";
import paymentRoute from "./routes/payment.routes";
import dashboardRoute from "./routes/stats.routes";

config({
  path: "./.env",
});

const PORT = process.env.PORT || 4000;

const mongoURI = process.env.MONGO_URI || "";

connectDB(mongoURI);

const app = express();
export const myCache = new NodeCache();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API working with /api/v1");
});

// using user routes routes
app.use("/api/v1/user", userRoute);

// using product routes
app.use("/api/v1/product", productRoute);

// using order routes
app.use("/api/v1/order", orderRoute);

app.use("/uploads", express.static("uploads"));

//using payment routes
app.use("/api/v1/payment", paymentRoute);

//using dashboard routes
app.use("/api/v1/dashboard", dashboardRoute);

app.use(errorMiddleWare);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
