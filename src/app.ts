import express from "express";
import { connectDB } from "./utils/features";

// importing routes
import userRoute from "./routes/user.routes";

const PORT = 8000;
connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API working with /api/v1");
});

// ushing routes
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
