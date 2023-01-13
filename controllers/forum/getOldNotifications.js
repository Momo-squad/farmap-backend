import asyncHandler from "../../utils/asyncHandler.js";
import Notification from "../../models/Notification.js";

const getOldNotifications = asyncHandler(async (req, res) => {
  let user_id = req.user.id;
  let allNotifications = await Notification.find({ user_id });

  res.json({ success: true, data: allNotifications.reverse() });
});

export default getOldNotifications;
