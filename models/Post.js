const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  comments: {
    type: Array,
    default: () => [],
  },
});

module.exports = mongoose.model("Posts", PostSchema);
