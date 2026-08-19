import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import { AppError } from "./utils/AppError.js";
import { globalErrorHandler } from "../middleware/error.middleware.js";

import postRoute from "./modules/post/post.route.js";
import authRoutes from "./modules/auth/auth.route.js";

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoute);

app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

export default app;
