const Comment = require("../models/commentModel");
const AppError = require("../utils/AppError");
const asyncCatch = require("../utils/asyncCatch");

exports.addComment = asyncCatch(async (req, res, next) => {
  const comment = new Comment(req.body);
  const newComment = await comment.save();
  if (newComment) {
    return res.status(200).json({
      status: "successful",
      message: "Komentar uspjesno poslat, ceka se odobrenje",
    });
  } else {
    return next(new AppError(404, "Komentar nije poslat, pokusajte ponovo"));
  }
});
exports.getComments = asyncCatch(async (req, res, next) => {
  const allComments = await Comment.find({ productId: req.params.id });
  if (allComments) {
    return res.status(200).json({
      status: "successful",
      comments: allComments,
    });
  } else {
    return next(new AppError(404, "Komentari za ovaj prozvod ne postoje"));
  }
});
