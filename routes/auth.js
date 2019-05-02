const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

const isAuth = require("../middlewares/isAuth");

router.post("/register", authController.postRegister);
router.post("/login", authController.postLogin);
router.get("/current", isAuth, authController.getCurrentUser);

module.exports = router;
