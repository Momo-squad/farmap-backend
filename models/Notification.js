import mongoose, { mongo } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const notificationSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user_id: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    profile_pic: String
  },
  { timestamps: true }
);

export default mongoose.model("notifications", notificationSchema);
