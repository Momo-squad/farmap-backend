import asyncHandler from "../../utils/asyncHandler.js";
import Question from "../../models/Question.js";
import eventTypes from "../../eventTypes.js";
import farmapEvents from "../../events/events.js";
import User from "../../models/User.js";

const upVoteQuestion = asyncHandler(async (req, res) => {
  let user_id = req.user.id;
  let { question_id } = req.body;

  if (!question_id)
    return res
      .status(400)
      .json({ success: false, error: "Question id cannot be null." });

  let doesUpvoteExist = await Question.find({
    _id: question_id,
    upvotes: { $in: [user_id] },
  });

  if (doesUpvoteExist.length > 0) {
    await Question.updateOne(
      {
        _id: question_id,
      },
      { $pull: { upvotes: user_id } }
    );
    return res.json({ success: true, message: "Upvote removed." });
  }

  let hasDownvoted = await Question.find({
    _id: question_id,
    downvotes: { $in: [user_id] },
  });

  if (hasDownvoted.length > 0) {
    await Question.updateOne(
      {
        _id: question_id,
      },
      { $pull: { downvotes: user_id } }
    );
  }

  await Question.updateOne(
    { _id: question_id },
    { $push: { upvotes: user_id } }
  );

  let voterInfo = await User.findById(user_id);

  let data = {
    event: "upvoted",
    data: {
      voter_id: user_id,
      username: voterInfo.username,
      author_id: user_id,
    },
  };

  farmapEvents.emit(eventTypes.upvoted, data);

  res.json({ success: true, message: "Upvoted successfully." });
});

const downVoteQuestion = asyncHandler(async (req, res) => {
  let user_id = req.user.id;
  let { question_id } = req.body;

  if (!question_id)
    return res
      .status(400)
      .json({ success: false, error: "Question id cannot be null." });

  let doesDownvoteExist = await Question.find({
    _id: question_id,
    downvotes: { $in: [user_id] },
  });

  if (doesDownvoteExist.length > 0) {
    await Question.updateOne(
      {
        _id: question_id,
      },
      { $pull: { downvotes: user_id } }
    );
    return res.json({ success: true, message: "Downvote removed." });
  }

  let hasUpvoted = await Question.find({
    _id: question_id,
    upvotes: { $in: [user_id] },
  });

  if (hasUpvoted.length > 0) {
    await Question.updateOne(
      {
        _id: question_id,
      },
      { $pull: { upvotes: user_id } }
    );
  }

  await Question.updateOne(
    { _id: question_id },
    { $set: { downvotes: user_id } }
  );

  res.json({ success: true, message: "Downvoted successfully." });
});

export { upVoteQuestion, downVoteQuestion };
