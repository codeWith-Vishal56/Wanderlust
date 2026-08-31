const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const {saveRedirectUrl} = require("../middleware");
// signup

router.get("/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/signup", async (req, res , next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      email,
      username,
    });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser,(err)=>{
      if(err){
        return next(err);
      }
    req.flash("success", "Welcome to Wanderlust");
    res.redirect("/listing");

    });

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
  "/login", saveRedirectUrl ,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust");
    const redirectUrl = res.locals.redirectUrl || "/listing";
    console.log(redirectUrl);
    res.redirect(redirectUrl);
  },
);

router.get("/logout",(req,res) => {
  req.logout((err) => {
    if(err){
      next(err.message);
    }else{
      req.flash("success" , "you are successfully logged out");
      res.redirect("/listing");
    }
  });
});

module.exports = router;
