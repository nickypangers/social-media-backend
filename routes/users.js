const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  User.find({})
    .exec()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message: err }));
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, dob } = req.body;
    const users = await User.find({ $or: [{ username }, { email }] }).exec();
    if (users.length > 0) {
      return res.json({ message: "User already exists" });
    }

    const birthday = new Date(`${dob.month}.${dob.day}.${dob.year}`);

    console.log(birthday);

    const user = new User({
      username,
      email,
      password,
      dob: birthday,
    });

    await user.save();
    return res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await User.find({
      $and: [{ username }, { password }],
    }).exec();
    if (users.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }
    return res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
