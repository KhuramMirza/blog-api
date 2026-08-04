import * as postService from "./post.service.js";
import { AppError } from "../../utils/AppError.js";

export const createPost = async (req, res) => {
  console.log(req.user);
  const payload = {
    title: req.body.title,
    content: req.body.content,
    author: req.user.id,
  };

  const post = await postService.createPost(payload);
  return res.status(201).json({
    success: true,
    message: "Post successfully created",
    data: { post },
  });
};

export const getPosts = async (req, res) => {
  const result = await postService.getPosts(req.query);

  return res.status(200).json({
    success: true,
    numPosts: result.length,
    result,
  });
};

export const getPostById = async (req, res, next) => {
  const post = await postService.getPostById(req.params.id);
  if (!post) {
    throw new AppError("Not post found with this ID", 404);
  }
  console.log(post);
  return res.status(200).json({
    success: true,
    message: "Post successfully fetched",
    data: { post },
  });
};

export const updatePost = async (req, res, next) => {
  const updatedPost = await postService.updatePost(
    req.params.id,
    req.body,
    req.user.id,
  );

  return res.status(200).json({
    success: true,
    message: "Post updated successfully",
    data: updatedPost,
  });
};

export const deletePost = async (req, res, next) => {
  const post = await postService.deletePost(req.params.id, req.user.id);
  return res.status(204).send();
};
