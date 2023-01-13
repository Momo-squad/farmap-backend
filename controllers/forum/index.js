import follow from "./follow.controller.js";
import addQuestion from "./addQuestion.js";
import addAnswer from "./addAnswer.js";
import { downVoteQuestion, upVoteQuestion } from "./voteQuestion.js";

import {
  getPopularQuestions,
  getNewestQuestions,
  getFollowingQuestions,
} from "./getQuestions.js";

import getOldNotifications from "./getOldNotifications.js";

export {
  follow,
  addQuestion,
  addAnswer,
  upVoteQuestion,
  downVoteQuestion,
  getPopularQuestions,
  getNewestQuestions,
  getFollowingQuestions,
  getOldNotifications,
};
