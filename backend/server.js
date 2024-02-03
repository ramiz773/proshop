import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
const port = process.env.PORT || 8000;
import productRoutes from "./Routes/productRoutes.js";

connectDB(); // connect to M~ongoDB

const app = express();

app.get("/", (req, res) => {
  res.send("api is runnig");
});

app.use("/api/products", productRoutes);

app.listen(port, () => console.log(`server is running on [server.js] ${port}`));
