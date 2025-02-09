import express, { urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config();
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import orderRoutes from "./routes/order.routes.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => res.send({ clientId: process.env.PAYPAL_CLEINT_ID }));

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 8000, () => {
  connectDB();
  console.log(`server running on port number ${process.env.PORT}`);
});
