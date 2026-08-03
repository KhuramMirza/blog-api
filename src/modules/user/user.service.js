import { User } from "./user.model.js";

export const createUser = async (payload) => {
  return await User.create(payload);
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email }).select("+password");
};
