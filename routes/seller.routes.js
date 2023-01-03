import express from "express"
import { getProfileData } from "../controllers/seller/index.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";

const sellerRouter = express.Router()

sellerRouter.use(isLoggedIn)

sellerRouter
    .get("/profile", getProfileData)

export default sellerRouter;