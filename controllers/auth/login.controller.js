import asyncHandler from "../../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import jwtUtils from "../../utils/jwtUtils.js";

const LoginController = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  if ((!email, !password))
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });

  const userData = await User.findOne({ email, role });

  if (!userData) {
    return res
      .status(403)
      .json({ success: false, error: "Invalid email or password" });
  }

  let isRightPassword = bcrypt.compareSync(password, userData.password);
  if (!isRightPassword)
    return res
      .status(403)
      .json({ success: false, error: "Invalid email or password." });

  let token = jwtUtils.generateToken(userData)

  res.json({
    success: true,
    message: "Login Successful",
    token
  });
});

export default LoginController;
