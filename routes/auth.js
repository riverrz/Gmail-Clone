const express = require("express");
const router = express.Router();

const authRoutes = require("../controllers/auth");

router.post("/register", authRoutes.postRegister);

module.exports = router;
