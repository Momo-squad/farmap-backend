import express from "express"

import { follow } from "../controllers/forum/index.js"

import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import checkRoles from "../middlewares/checkRoles.middleware.js"

const forumRouter = express.Router()

forumRouter.use(isLoggedIn)
forumRouter
    .post("/follow", follow)

export default forumRouter;