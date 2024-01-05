import express from "express";
import { connectDB } from "./utils/features";

// importing routes
import userRoute from "./routes/user.routes";
import { errorMiddleWare } from "./middlewares/error";

const PORT = 8000;
connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API working with /api/v1");
});

// ushing user routes routes
app.use("/api/v1/user", userRoute);


app.use(errorMiddleWare)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
