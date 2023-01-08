import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "seller"],
      required: true,
    },
    firm_name: {
      type: String,
    },
    followers: {
      type: [ObjectId],
      ref: "users",
    },
    following: {
      type: [ObjectId],
      ref: "users",
    },
    profile_pic: {
      type: String,
      default:
        "https://res.cloudinary.com/du4ytrjmm/image/upload/v1673176521/farmap/blank-profile-picture-973460_1280_snt79x.png",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", () => {});

userSchema.post("save", () => {});

export default mongoose.model("users", userSchema);
