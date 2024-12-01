import express from "express";
import dotenv from "dotenv";
dotenv.config();
import productRoute from "./routes/product.routes.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const app = express();

app.get("/", () => {
  console.log("App is running");
});

app.use("/api/products", productRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 8000, () => {
  connectDB();
  console.log(`server running on port number ${process.env.PORT}`);
});
