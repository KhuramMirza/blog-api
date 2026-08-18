import { PostModel } from "./post.model.js";
import { APIFeatures } from "../../utils/apiFeatures.js";
import { AppError } from "../../utils/AppError.js";
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

export const getUserPosts = async (queryString, authorId) => {
  const features = new APIFeatures(
    PostModel.find({ author: authorId }),
    queryString,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  return await features.query;
};

export const getPostById = async (id) => {
  return await PostModel.findById(id);
};

export const updatePost = async (id, payload, author) => {
  const post = await PostModel.findById(id);
  if (!post) {
    throw new AppError("No post found with this ID", 404);
  }
  if (post.author.toString() !== author) {
    throw new AppError("You don't have authorization to edit this post.", 403);
  }
  return await PostModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

export const deletePost = async (id, author) => {
  const post = await PostModel.findById(id);
  if (!post) {
    throw new AppError("No post found with this ID", 404);
  }
  if (post.author.toString() !== author) {
    throw new AppError(
      "You don't have authorization to delete this post.",
      403,
    );
  }
  return await PostModel.findByIdAndDelete(id);
};
