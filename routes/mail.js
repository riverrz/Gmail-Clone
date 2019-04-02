const express = require("express");
const router = express.Router();

const mailControllers = require("../controllers/mail");

router.get("/:user", mailControllers.getMail);

router.post("/", mailControllers.postMail);

module.exports = router;
