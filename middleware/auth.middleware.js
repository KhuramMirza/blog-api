import { AppError } from "../src/utils/AppError.js";
import jwt from "jsonwebtoken";

export default async function verifyToken(req, res, next) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];

  if (!token)
    return next(new AppError("Not authorized access this route", 401));
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }
}
