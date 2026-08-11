import { AppError } from "../src/utils/AppError.js";
import jwt from "jsonwebtoken";

export default async function verifyToken(req, res, next) {
  const token = req.cookies?.token ?? null;
  if (!token) {
    throw new AppError("Not authorized to access this route", 401);
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }
}
