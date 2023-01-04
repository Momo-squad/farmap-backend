import jwtUtils from "../utils/jwtUtils.js";
import User from "../models/User.js";

const errors = {
  not_authorized_error:
    "You are not authorized to view the requested resource.",
  not_authorized_status: 403,
};

export default async function isLoggedIn(req, res, next) {
  const { authorization } = req.headers;

  let token =  authorization && authorization.split(" ")[1];

  if (!token) {
    return res
      .status(errors.not_authorized_status)
      .json({ success: false, error: errors.not_authorized_error });
  }

  let payload = jwtUtils.verifyToken(token);

  if (!payload) {
    return res
      .status(errors.not_authorized_status)
      .json({ success: false, error: errors.not_authorized_error });
  }

  const userData = await User.findOne({
    email: payload.email,
    role: payload.role,
    username: payload.username,
  });

  if (!userData) {
    return res
      .status(errors.not_authorized_status)
      .json({ success: false, error: errors.not_authorized_error });
  }

  req.user = payload

  next()

}
