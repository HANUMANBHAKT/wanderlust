const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const passport = require("passport");
const localStrategy = require("passport-local");
const { savedRedirecturl } = require("../middleware.js");
const usercontroller = require("../controllers/users.js");

passport.use(new localStrategy(user.authenticate()));

// rendersingnupform
router.get("/signup", usercontroller.rendersignupform);

// singup route
router.post("/signup", usercontroller.signup);

// renderloginform
router.get("/login", usercontroller.renderloginform);

// login route
router.post(
  "/login",
  savedRedirecturl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  usercontroller.login
);

// logout route
router.get("/logout", usercontroller.logout);

module.exports = router;
