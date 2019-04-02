const express = require("express");
const router = express.Router();

const Mail = require("../models/Mail");

router.get("/", (req, res, next) => {
  res.send("So many mails");
});

module.exports = router;
