import express from "express"

import { follow, addQuestion, addAnswer } from "../controllers/forum/index.js"

import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import checkRoles from "../middlewares/checkRoles.middleware.js"

const forumRouter = express.Router()

forumRouter.use(isLoggedIn)
forumRouter
    .post("/follow", follow)
    .post("/add-question", addQuestion)
    .post("/add-answer", addAnswer)

export default forumRouter;