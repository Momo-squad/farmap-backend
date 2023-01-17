import Order from "../../models/Order.js";
import asyncHandler from "../../utils/asyncHandler.js";

const createOrder = asyncHandler(async (req, res) => {
  let author_id = req.user.id;
  let { crop_name, amount, quantity, status } = req.body;

  if (!crop_name || !amount || !quantity) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  }

  if (typeof amount != "number" || typeof quantity != "number") {
    return res.status(400).json({
      success: false,
      error: "Amount and quantity needs to be number",
    });
  }

  let total = amount * quantity;

  let newOrder = new Order({
    author_id,
    crop_name,
    amount,
    quantity,
    status,
    total,
  });
  await newOrder.save();

  res.status(201).json({ success: true, message: "New order listed." });
});

const getOrder = asyncHandler(async (req, res) => {
  let author_id = req.user.id;
  let allOrders = await Order.find({ author_id });
  allOrders.reverse();
  res.json({ success: true, message: "Orders fetched.", data: allOrders });
});

const changeStatus = asyncHandler(async (req, res) => {
  let author_id = req.user.id;
  let { order_id } = req.body;

  let fetchOrder = await Order.findOne({ _id: order_id, author_id });

  if (!fetchOrder) {
    return res.status(400).json({ success: false, error: "Invalid order id." });
  }

  fetchOrder.status = !fetchOrder.status;

  await fetchOrder.save();

  res.json({ success: true, message: "Status changed." });
});

const deleteOrder = asyncHandler(async (req, res) => {
  let author_id = req.user.id;
  let { order_id } = req.body;

  const orderDetails = await Order({ _id: order_id, author_id });

  if (!orderDetails) {
    return res.status(400).json({ success: false, error: "Invalid order id." });
  }
  await Order.deleteOne({ _id: order_id });

  res.json({ success: true, message: "Order deleted." });
});

export { createOrder, getOrder, changeStatus, deleteOrder };
