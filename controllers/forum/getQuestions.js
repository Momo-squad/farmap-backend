import asyncHandler from "../../utils/asyncHandler.js";
import User from "../../models/User.js";
import Question from "../../models/Question.js";

const getPopularQuestions = asyncHandler(async (req, res) => {
  let data = await fetchQuestions();

  res.json({ success: true, data });
});

const getNewestQuestions = asyncHandler(async (req, res) => {
  let data = await fetchQuestions();

  res.json({ success: true, data });
});

const getFollowingQuestions = asyncHandler(async (req, res) => {
  let data = await fetchQuestions();

  res.json({ success: true, data });
});

async function fetchQuestions() {
  let allQuestions = await Question.find()
    .populate({
      path: "author_id",
      model: "users",
      select:
        "-password -followers -following -email -phone -createdAt -updatedAt -address",
    })
    .select("-downvotes");

  return allQuestions;
}

export { getPopularQuestions, getNewestQuestions, getFollowingQuestions };
