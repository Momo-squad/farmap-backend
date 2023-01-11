import express from "express";
import dotenv from "dotenv";
import { WebPubSubServiceClient } from "@azure/web-pubsub";

import connectDB from "./utils/connectDB.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import sellerRouter from "./routes/seller.routes.js";
import forumRouter from "./routes/forum.routes.js";

dotenv.config();
const { PORT, MONGO_URI, PUBSUB_URI } = process.env;

const app = express();
const serviceClient = new WebPubSubServiceClient(PUBSUB_URI, "farmap");

// database connection
connectDB(MONGO_URI);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/seller", sellerRouter);
app.use("/forum", forumRouter);

app.get("/", (req, res) => {
  res.send("Farmap backend service.");
});

app.get("/negotiate", async (req, res) => {
  let id = req.query.id;
  if (!id) {
    res.status(400).send("missing user id");
    return;
  }
  let token = await serviceClient.getClientAccessToken({ userId: id });
  res.json({
    url: token.url,
  });
});

app.listen(PORT, () => {
  console.log(`Farmap backend service is listening on port ${PORT}.`);
});
