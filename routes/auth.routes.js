import express from "express";
import multer from "multer";

import {
  LoginController,
  SignupController,
} from "../controllers/auth/index.js";

const authRouter = express.Router();
const upload = multer();

authRouter
  .post("/login", LoginController)
  .post("/signup", upload.any(), SignupController);

export default authRouter;
