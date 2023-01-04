import asyncHandler from "../../utils/asyncHandler.js";
import User from "../../models/User.js";

const deleteSellerAccount = asyncHandler(async (req, res) => {
    
  const userData = await User.findOne({
    email: req.user.email,
    username: req.user.username,
    role: req.user.role,
  });

  if (!userData) {
    return res
      .status(403)
      .json({
        success: false,
        error: "Sorry, you cannot perform this action.",
      });
  }

  await userData.delete();

  res.json({ success: false, message: "Account deleted successfully." });
});

export default deleteSellerAccount;
