import express from "express";
import dotenv from "dotenv";

import connectDB from "./utils/connectDB.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import sellerRouter from "./routes/seller.routes.js";

dotenv.config();
const { PORT, MONGO_URI } = process.env;

const app = express();

// database connection
connectDB(MONGO_URI)

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// api routes
app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/seller", sellerRouter)

app.get("/", (req, res) => {
    res.send("Farmap backend service.")
})

app.listen(PORT, () => {
  console.log(`Farmap backend service is listening on port ${PORT}.`);
});
