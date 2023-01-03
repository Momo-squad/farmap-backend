import mongoose from "mongoose";

export default function connectDB(mongo_uri) {
  mongoose.set('strictQuery', false)
  mongoose
    .connect(mongo_uri)
    .then(() => console.log("Connected to azure comsosDB for mongoDB."))
    .catch((err) => console.log(err));
}
