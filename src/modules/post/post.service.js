import { PostModel } from "./post.model.js";
import { APIFeatures } from "../../utils/apiFeatures.js";
export const createPost = async (payload) => {
  return await PostModel.create(payload);
};

export const getPosts = async (queryString) => {
  const features = new APIFeatures(PostModel.find(), queryString)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  return await features.query;
};

export const getPostById = async (id) => {
  return await PostModel.findById(id);
};

export const updatePost = async (id, payload) => {
  return await PostModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

export const deletePost = async (id) => {
  return await PostModel.findByIdAndDelete(id);
};
