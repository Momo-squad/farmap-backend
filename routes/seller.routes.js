import express from "express"
import { getProfileData } from "../controllers/seller/index.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import checkRoles from "../middlewares/checkRoles.middleware.js"

const sellerRouter = express.Router()

sellerRouter.use(isLoggedIn)
sellerRouter.use(checkRoles.isSeller)

sellerRouter
    .get("/profile", getProfileData)

export default sellerRouter;