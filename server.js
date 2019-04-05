const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const mailRoutes = require("./routes/mail");
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-ff6fm.mongodb.net/gmail?retryWrites=true",
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log("DB Connected");
    }
  }
);

// Routes
app.use("/mail", mailRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error.message);
  res.json({
    error: {
      statusCode: error.statusCode,
      message: error.message
    }
  });
});

app.listen(PORT, () => {
  console.log("Server has started ");
});
