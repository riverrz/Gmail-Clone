const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { DB_URI } = require("./keys/keys");

const mailRoutes = require("./routes/mail");
const authRoutes = require("./routes/auth");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect(DB_URI, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB Connected");
  }
});

// Routes
app.use("/api/mail", mailRoutes);
app.use("/api/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(error.statusCode).json({
    error: true,
    messages: [error.message]
  });
});

app.listen(PORT, () => {
  console.log("Server has started ");
});
