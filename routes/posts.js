const express = require("express");
const router = express.Router();
const { Post, Comment } = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().exec();
    return res.json({ success: true, posts });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

router.post("/create", async (req, res) => {
  const post = new Post({
    username: req.body.username,
    content: req.body.content,
  });

  try {
    const data = await post.save();
    return res.json({ success: true, data });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).exec();
    return res.json({ success: true, post });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const username = req.body.username;
    const response = await Post.findByIdAndDelete({ _id: id, username });
    if (response === null) {
      return res.json({ success: false, message: "Unable to delete post." });
    }
    return res.json({ success: true });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

router.post("/:id/comments/add", async (req, res) => {
  try {
    const id = req.params.id;

    const comment = new Comment({
      username: req.body.username,
      comment: req.body.comment,
    });

    const post = await Post.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $push: {
          comments: comment,
        },
      }
    );
    return res.json({ success: true, post });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

module.exports = router;
