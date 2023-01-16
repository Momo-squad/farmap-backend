import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const questionSchema = new mongoose.Schema(
  {
    author_id: {
      type: ObjectId,
      required: true,
      ref: "users",
    },
    question: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    upvotes: {
      type: [ObjectId],
      ref: "users",
    },
    downvotes: {
      type: [ObjectId],
      ref: "users",
    },
    photo: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("questions", questionSchema);
