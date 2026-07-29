import { Router } from "express";
import { validate } from "../../../middleware/validate.middleware.js";
import { createPostSchema, updatePostSchema } from "./post.schema.js";
import * as postController from "./post.controller.js";

const router = Router();

router
  .route("/")
  .post(validate(createPostSchema), postController.createPost)
  .get(postController.getPosts);

router
  .route("/:id")
  .get(postController.getPostById)
  .patch(validate(updatePostSchema), postController.updatePost)
  .delete(postController.deletePost);

export default router;
