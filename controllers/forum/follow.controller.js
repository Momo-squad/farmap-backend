import asyncHandler from "../../utils/asyncHandler.js";
import User from "../../models/User.js";

const follow = asyncHandler(async (req, res) => {
  const userData = await User.findOne({
    email: req.user.email,
    role: req.user.role,
  });

  let followerId = String(req.body.user_id);

  userData._id = String(userData._id);

  if (userData._id === followerId) {
    return res
      .status(400)
      .json({ success: false, error: "You cannot follow to yourself." });
  }

  let doesFollowerExist = await User.find({
    email: req.user.email,
    role: req.user.role,
    following: { $in: [followerId] },
  });

  //   unfollow user if it already exits
  if (doesFollowerExist.length > 0) {
    await User.updateOne(
      { email: req.user.email, role: req.user.role },
      { $pull: { following: followerId } }
    );

    await User.updateOne(
      { _id: followerId },
      { $pull: { followers: userData._id } }
    );

    return res.json({ success: true, message: "Unfollowed successfully." });
  }

  //   follow user if not followed already
  await User.updateOne(
    { email: req.user.email, role: req.user.role },
    { $set: { following: followerId } }
  );
  await User.updateOne(
    { _id: followerId },
    { $set: { followers: userData._id } }
  );

  res
    .status(201)
    .json({ success: true, message: "Follower added successfully." });
});

export default follow;
