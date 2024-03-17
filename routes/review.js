const express = require("express");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utility/Expresserror.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isloggedin, isauthor } = require("../middleware.js");
const reviewcontroller = require("../controllers/reviews.js");

router.post("/", isloggedin, reviewcontroller.createreview);

// delete route
router.delete(
  "/:reviewid",
  isloggedin,
  isauthor,
  reviewcontroller.deletereview
);

module.exports = router;
