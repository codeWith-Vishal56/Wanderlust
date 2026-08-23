const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// signup

router.get("/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      email,
      username,
    });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.flash("success", "Welcome to Wanderlust");
    res.redirect("/listing");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
});

// login

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust");
    res.redirect("/listing");
  },
);

module.exports = router;
