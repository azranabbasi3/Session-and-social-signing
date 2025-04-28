const express = require("express");
const { login, register, profile, logout } = require("../controllers/auth");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", profile);
router.post("/logout", logout);
module.exports = router;
