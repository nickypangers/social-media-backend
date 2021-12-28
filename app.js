const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv/config");

// Import routes
const postsRoute = require("./routes/posts");

// Middlewares
app.use(bodyParser.json());
app.use("/posts", postsRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("connected to db");
});

app.listen(3030);
