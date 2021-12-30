const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find().exec();
    return res.json({ success: true, users });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, dob } = req.body;
    const users = await User.find({ $or: [{ username }, { email }] }).exec();
    if (users.length > 0) {
      return res.json({ message: "User already exists" });
    }

    const birthday = new Date(Date.UTC(dob.year, dob.month, dob.day));

    const user = new User({
      username,
      email,
      password,
      dob: birthday,
    });

    await user.save();
    return res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ message: "Please enter username and password" });
    }

    const users = await User.find({
      $and: [{ username }, { password }],
    }).exec();
    if (users.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = users[0];

    return res.json({
      success: true,
      user: {
        username: user.username,
        email: user.email,
        dob: user.dob,
      },
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;
