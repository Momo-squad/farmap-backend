import express from "express"
import { getProfileData } from "../controllers/user/index.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";

const userRouter = express.Router()

userRouter.use(isLoggedIn)

userRouter
    .get("/profile", getProfileData)

export default userRouter;