const Listing = require("./models/listing");
const Review = require("./models/review");
module.exports.isloggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You are not logged in");
    return res.redirect("/login");
  }
  next();
};

module.exports.savedRedirecturl = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

module.exports.isowner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.curruser._id)) {
    req.flash("error", "you are not owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
module.exports.isauthor = async (req, res, next) => {
  let { id, reviewid } = req.params;
  let review = await Review.findById(reviewid);
  if (!review.author.equals(res.locals.curruser._id)) {
    req.flash("error", "you are not owner of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
