const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  productTitle: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
