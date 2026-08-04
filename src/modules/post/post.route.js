import { Router } from "express";
import { validate } from "../../../middleware/validate.middleware.js";
import { createPostSchema, updatePostSchema } from "./post.schema.js";
import * as postController from "./post.controller.js";
import verifyToken from "../../../middleware/auth.middleware.js";

const router = Router();

router
  .route("/")
  .post(verifyToken, validate(createPostSchema), postController.createPost)
  .get(postController.getPosts);

router
  .route("/:id")
  .get(postController.getPostById)
  .patch(verifyToken, validate(updatePostSchema), postController.updatePost)
  .delete(verifyToken, postController.deletePost);

export default router;
