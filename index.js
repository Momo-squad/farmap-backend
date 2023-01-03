import express from "express";
import dotenv from "dotenv";

import authRouter from "./routes/auth.routes.js";

import connectDB from "./utils/connectDB.js";

dotenv.config();
const { PORT, MONGO_URI } = process.env;

const app = express();

connectDB(MONGO_URI)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/auth", authRouter)

app.get("/", (req, res) => {
    res.send("Farmap backend service.")
})

app.listen(PORT, () => {
  console.log(`Farmap backend service is listening on port ${PORT}.`);
});
