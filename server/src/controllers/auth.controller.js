import passport from "passport";
import "dotenv/config";

import userService from "../services/user.service.js";

const login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({ message: info?.message || "Unauthorized" });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: "Login success!", user });
    });
  })(req, res, next);
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const isRegisterDisabled = process.env.REGISTER_DISABLED === "true";

    if (isRegisterDisabled) {
      return res
        .status(403)
        .json({ message: "Register temporarily disabled!" });
    }

    const user = await userService.createUser({
      username,
      email,
      password,
    });

    req.login(user, (err) => {
      if (err)
        return res.status(err.status || 500).json({ message: err.message });

      return res.json({ message: "Register success!", user });
    });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  req.logout((err) => {
    if (err)
      return res.status(err.status || 500).json({ message: "Logout error" });
    res.json({ message: "Logout successful" });
  });
};

const checkAuth = async (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, message: "Authorized", user: req.user });
  } else {
    res.json({ isAuthenticated: false, message: "Unauthorized" });
  }
};

export default { login, register, logout, checkAuth };
