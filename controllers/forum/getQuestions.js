import asyncHandler from "../../utils/asyncHandler.js";
import User from "../../models/User.js";
import Question from "../../models/Question.js";

const getPopularQuestions = asyncHandler(async (req, res) => {
  let data = await fetchQuestions();

  res.json({ success: true, data, message: "Popular posts fetched." });
});

const getNewestQuestions = asyncHandler(async (req, res) => {
  let data = await fetchQuestions();

  res.json({ success: true, data, message: "Recently added posts fetched." });
});

const getFollowingQuestions = asyncHandler(async (req, res) => {
  let data = await fetchQuestions();

  res.json({ success: true, data, message: "Followed users post fetched." });
});

async function fetchQuestions() {
  let allQuestions = await Question.find()
    .populate({
      path: "author_id",
      model: "users",
      select:
        "-password -following -email -phone -createdAt -updatedAt -address",
    })

  return allQuestions.reverse();
}

export { getPopularQuestions, getNewestQuestions, getFollowingQuestions };
