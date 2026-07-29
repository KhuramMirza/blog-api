import express from "express";
import postRoute from "./modules/post/post.route.js";
import { globalErrorHandler } from "../middleware/error.middleware.js";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(express.json());

app.use("/api/posts", postRoute);

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(globalErrorHandler);

export default app;
