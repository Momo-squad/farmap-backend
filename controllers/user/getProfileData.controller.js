import asyncHandler from "../../utils/asyncHandler.js";
import User from "../../models/User.js";

const getProfileData = asyncHandler(async (req, res) => {
    const data = await User.findOne({ email: req.user.email, role: req.user.role, username: req.user.username }).select("-password")

    if(!data) {
        return res.status(400).json({success: false, error: "Something went wrong."})
    }
    
    res.json({ success: true, data, message: "User profile data fetched successfully." })
})

export default getProfileData;