const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv/config");

// Import routes
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");

// CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/posts", postsRoute);
app.use("/users", usersRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("connected to db");
});

app.listen(3030);
