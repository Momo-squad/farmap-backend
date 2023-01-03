import express from "express"
import {LoginController, SignupController} from "../controllers/auth/index.js"

const authRouter = express.Router()

authRouter
    .post("/login", LoginController)
    .post("/signup", SignupController)
    
export default authRouter;