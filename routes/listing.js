const express = require("express");
const router = express.Router();
const ExpressError = require("../utility/Expresserror.js");
const Listing = require("../models/listing.js");
const { isloggedin, isowner } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");

const upload = multer({ storage });

// index route and create routes

router
  .route("/")
  .get(listingController.index)
  .post(
    isloggedin,
    upload.single("listing[image]"),
    listingController.createlisting
  );

// new route
router.get("/new", isloggedin, listingController.rendernewform);

// showroute // update route // delete route
router
  .route("/:id")
  .get(listingController.showlisting)
  .put(
    isloggedin,
    isowner,
    upload.single("listing[image]"),
    listingController.updatelisting
  )
  .delete(isloggedin, isowner, listingController.destroylisting);

// edit route
router.get("/:id/edit", isowner, listingController.rendereditform);

module.exports = router;
