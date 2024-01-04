import express from "express";

// importing routes
import userRoute from "./routes/user";

const PORT = 8000;

const app = express();

app.get("/", (req, res) => {
  res.send("API working with /api/v1");
});

// ushing routes
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
