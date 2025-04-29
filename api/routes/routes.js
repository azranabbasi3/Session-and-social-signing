const express = require("express");
const { login, register, profile, logout } = require("../controllers/auth");
const passport = require("passport");
const router = express.Router();

// Auth routes
router.post("/login", login);
router.post("/register", register);
router.get("/profile", profile);
router.post("/logout", logout);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    session: true,
  }),
  (req, res) => {
    req.session.user = {
      id: req.user.id,
      email: req.user.emails[0].value,
      name: req.user.displayName,
    };
    res.redirect("http://localhost:3000/profile");
  }
);
router.get(
  "/auth/github",
  passport.authenticate("github", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:3000/login",
    session: true,
  }),
  (req, res) => {
    req.session.user = {
      id: req.user.id,
      email: req.user.profileUrl,
      name: req.user.username,
    };
    res.redirect("http://localhost:3000/profile");
  }
);
module.exports = router;
