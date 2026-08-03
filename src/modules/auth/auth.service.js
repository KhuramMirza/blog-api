import jwt from "jsonwebtoken";
import * as userService from "../user/user.service.js";
import { AppError } from "../../utils/AppError.js";

const signInToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const register = async (payload) => {
  const user = await userService.createUser(payload);
  user.password = undefined;
  const token = await signInToken(user._id);
  return { user, token };
};

export const login = async (email, password) => {
  const user = await userService.findUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await user.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = await signInToken(user._id);
  user.password = undefined;
  return { user, token };
};
