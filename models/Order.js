import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema({
  author_id: {
    type: ObjectId,
    ref: "users",
  },
  crop_name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model("orders", orderSchema);
