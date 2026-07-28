import { z } from "zod";
export const createPostSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
      })
      .min(3),
    content: z
      .string({
        required_error: "Content is required",
        invalid_type_error: "Content must be a string",
      })
      .min(10, "Content must be at least 10 characters long"),

    author: z.string().optional(),
  }),
});

export const updatePostSchema = z.object({
  body: z
    .object({
      title: z.string().min(3).optional(),
      content: z.string().min(10).optional(),
      author: z.string().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message:
        "At least one field (title, content, author) must be provided to update",
    }),
});
