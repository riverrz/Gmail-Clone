const express = require("express");
const router = express.Router();

const isAuth = require("../middlewares/isAuth");

const mailControllers = require("../controllers/mail");

router.get("/", isAuth, mailControllers.getMails);
router.get("/:mailId", isAuth, mailControllers.getMail);
router.delete("/:mailId", isAuth, mailControllers.deleteMail);

router.post("/", isAuth, mailControllers.postMail);

module.exports = router;
