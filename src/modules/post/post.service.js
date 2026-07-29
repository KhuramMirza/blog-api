import postModel from "./post.model.js";

export const createPost = async (payload) => {
  return await postModel.create(payload);
};

export const getPosts = async (page = 1, limit = 5) => {
  const posts = await postModel.find();
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return {
    total: posts.length,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(posts.length / limit),
    data: paginatedPosts,
  };
};

export const getPostById = async (id) => {
  return await postModel.findById(id);
};

export const updatePost = async (id, payload) => {
  return await postModel.findByIdAndUpdate(id, payload);
};

export const deletePost = async (id) => {
  return await postModel.findByIdAndDelete(id);
};
