import asyncHandler from "../../utils/asyncHandler.js";
import Question from "../../models/Question.js";

const addQuestion = asyncHandler(async (req, res) => {
  let { question, tags } = req.body;

  const author_id = req.user.id;

  console.log(author_id)

  if (!question) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid data provided." });
  }

  if (!tags || tags.length <= 0) {
    tags = [];
  }

  let newQuestion = new Question({ author_id, question, tags });
  await newQuestion.save();

  res.json({ success: true, message: "New question added." });
});

export default addQuestion;
