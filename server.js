import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import morgan from "morgan";
const app = express();

// routers
import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";

// middlewares
import { authenticateUser } from "./middlewares/authMiddleware.js";
import errorHandleMiddleware from "./middlewares/errorHandlerMiddleware.js";

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.get("/", (req, res) => res.send("hello world"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", authenticateUser, productRouter);

// not found
app.use("*", (req, res) => {
  res.status(404).json({ msg: "route does not exist" });
});

// error
app.use(errorHandleMiddleware);

const port = process.env.PORT || 5000;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
