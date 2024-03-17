const user = require("../models/user");
module.exports.rendersignupform = (req, res) => {
  res.render("signup.ejs");
};

module.exports.signup = async (req, res) => {
  let { username, email, password } = req.body;
  const newuser = new user({ email, username });
  const registeruser = await user.register(newuser, password);
  req.login(registeruser, (err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    console.log("user logged in");
    req.flash("success", "welcome to wandelust");
    // res.redirect("/listings");
    res.redirect(req.session.returnTo || "/listings");
  });

  console.log(registeruser);
  console.log(email);
};

module.exports.renderloginform = (req, res) => {
  res.render("login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "welcome to wandelust");
  res.redirect(req.session.returnTo || "/listings");
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      next(err);
    }
    req.flash("success", "you are logged out");
    res.redirect("/listings");
  });
};
