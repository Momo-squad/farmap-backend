import express from "express";
import { getProfileData, deleteUserAccount } from "../controllers/user/index.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import checkRoles from "../middlewares/checkRoles.middleware.js";

const userRouter = express.Router();

userRouter.use(isLoggedIn);
userRouter.use(checkRoles.isUser);

userRouter
    .get("/profile", getProfileData)
    .delete("/delete", deleteUserAccount)

export default userRouter;
