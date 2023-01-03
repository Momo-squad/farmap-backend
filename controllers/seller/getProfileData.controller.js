import asyncHandler from "../../utils/asyncHandler.js";

const getProfileData = asyncHandler(async (req, res) => {
    res.send("get profile data")
})

export default getProfileData;