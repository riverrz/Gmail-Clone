const express = require("express");
const router = express.Router();

const mailControllers = require("../controllers/mail");

router.get("/name/:user", mailControllers.getMails);
router.get("/:mailId", mailControllers.getMail);

router.post("/", mailControllers.postMail);

module.exports = router;
