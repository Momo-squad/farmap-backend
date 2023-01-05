import asyncHandler from "../../utils/asyncHandler.js";
import Question from "../../models/Question.js";
import Answer from "../../models/Answer.js";

const addAnswer = asyncHandler(async (req, res) => {
  let { answer, question_id } = req.body;
  let author_id = req.user.id;

  if (!answer || !question_id) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid data provided." });
  }

  let doesQuestionExists = await Question.findOne({ _id: question_id });

  if (!doesQuestionExists) {
    return res
      .status(404)
      .json({ success: false, error: "Question does not exist." });
  }

  let newAnswer = new Answer({ answer, question_id, author_id });

  await newAnswer.save();

  res.json({ success: true, message: "Answer added." });
});

export default addAnswer;
