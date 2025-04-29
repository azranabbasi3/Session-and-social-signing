const User = require("../models/user");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.status(201).json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  req.session.user = {
    id: user._id,
    email: user.email,
    name: user.name,
  };

  req.session.save((err) => {
    if (err) {
      console.error("Session save error:", err);
      return res.status(500).json({ message: "Session error" });
    }

    res.status(200).json({
      message: "Login successful",
      user: req.session.user,
    });
  });
};

const profile = async (req, res) => {
  if (!req.session.user) {
    return res.status(500).json({ message: "Not authenticated" });
  }
  res.json({ user: req.session.user });
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Session error" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logout successful" });
  });
};

module.exports = { login, register, profile, logout };
