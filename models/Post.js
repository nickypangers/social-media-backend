const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const PostSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  comments: [CommentSchema],
});

const Post = mongoose.model("Post", PostSchema);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Post, Comment };
