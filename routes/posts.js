const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().exec();
    return res.json({ success: true, posts });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

router.post("/create", async (req, res) => {
  const post = new Post({
    username: req.body.username,
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const data = await post.save();
    return res.json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

router.post("/:id/comment/add", async (req, res) => {
  const id = req.params.id;
  return res.json({ id });
});

module.exports = router;
