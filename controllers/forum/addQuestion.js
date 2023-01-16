import asyncHandler from "../../utils/asyncHandler.js";
import Question from "../../models/Question.js";
import uploadImage from "../../utils/uploadImage.js";

const addQuestion = asyncHandler(async (req, res) => {
  let { question, tags } = req.body;
  let files;
  let imgObj;

  if (typeof tags === "string") {
    tags = JSON.parse(tags);
  }

  const author_id = req.user.id;

  console.log({ file: req.files });

  if (req.files.length > 0) {
    files = req.files[0];
    imgObj = await uploadImage(files);
  }

  if (!question) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid data provided." });
  }

  if (!tags || tags.length <= 0) {
    tags = [];
  }

  console.log({ imgObj });

  let imgUrl = imgObj ? imgObj.data.url : "";

  let newQuestion = new Question({ author_id, question, tags, photo: imgUrl });
  await newQuestion.save();

  res.json({ success: true, message: "New post added." });
});

export default addQuestion;
