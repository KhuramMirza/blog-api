import express from "express";
import helmet from "helmet";
import { AppError } from "./utils/AppError.js";
import { globalErrorHandler } from "../middleware/error.middleware.js";
import postRoute from "./modules/post/post.route.js";
import authRoutes from "./modules/auth/auth.route.js";

const app = express();

app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoute);

app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

export default app;
