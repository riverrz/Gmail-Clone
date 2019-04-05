const express = require("express");
const router = express.Router();

const authRoutes = require("../controllers/auth");

router.post("/register", authRoutes.postRegister);
router.post("/login", authRoutes.postLogin);

module.exports = router;
