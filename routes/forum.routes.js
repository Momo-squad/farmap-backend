import express from "express";

import {
  follow,
  addQuestion,
  addAnswer,
  upVoteQuestion,
  downVoteQuestion,
  getPopularQuestions,
  getNewestQuestions,
  getFollowingQuestions,
  getOldNotifications,
} from "../controllers/forum/index.js";

import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import checkRoles from "../middlewares/checkRoles.middleware.js";
import multer from "multer";

const forumRouter = express.Router();
const upload = multer();

forumRouter
  .get("/posts/popular", getPopularQuestions)
  .get("/posts/recent", getNewestQuestions);

forumRouter.use(isLoggedIn);
forumRouter
  .post("/follow", follow)
  .post("/add-question", upload.any(), addQuestion)
  .post("/add-answer", addAnswer)
  .post("/upvote", upVoteQuestion)
  .post("/downvote", downVoteQuestion)
  .get("/posts/following", getFollowingQuestions)
  .get("/notifications", getOldNotifications);

export default forumRouter;
