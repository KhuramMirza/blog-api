import { User } from "./user.model.js";
import { AppError } from "../../utils/AppError.js";

export const createUser = async (payload) => {
  const user = await findUserByEmail(payload.email);
  if (user) {
    throw new AppError("User already exists", 409);
  }
  try {
    return await User.create(payload);
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0]; // e.g. "email"
      throw new AppError(`${field} already exists`, 409);
    }
    throw err;
  }
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email }).select("+password");
};

export const findUserById = async (id) => {
  return await User.findById(id);
};
