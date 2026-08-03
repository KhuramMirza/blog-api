import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
    },

    content: {
      type: String,
      required: true,
      minLength: 10,
    },
  },
  {
    timestamps: true,
  },
);

export const PostModel = mongoose.model("Post", PostSchema);
