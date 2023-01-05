import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const answerSchema = new mongoose.Schema(
  {
    author_id: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    question_id: {
      type: ObjectId,
      ref: "questions",
      required: true,
    },
    answer: {
      type: String,
      required: true,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("answers", answerSchema);
