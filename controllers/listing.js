const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const alllistings = await Listing.find({});
  // res.send(alllistings);
  let Trendings = await Listing.find({ category: "Trending" }).limit(3);
  console.log(Trendings);
  res.render("index.ejs", { alllistings, Trendings });
};

module.exports.rendernewform = (req, res) => {
  res.render("new.ejs");
};

module.exports.showlisting = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "listing not exist");
    return res.redirect("/listings");
  }

  res.render("show.ejs", { listing });
};

module.exports.createlisting = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let listing = req.body.listing;
  const newlisting = new Listing(req.body.listing);
  newlisting.owner = req.user._id;
  newlisting.image = { url, filename };
  await newlisting.save();
  req.flash("success", "listing created successfully");
  res.redirect("/listings");
};

module.exports.rendereditform = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "listing not exist");
    return res.redirect("/listings");
  }
  let originalimage = listing.image.url;

  originalimage = originalimage.replace(
    "/upload",
    "/upload/w_400,h_300,c_scale"
  );

  res.render("edit.ejs", { listing });
};

module.exports.updatelisting = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file != "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image.url = url;
    listing.image.filename = filename;
    await listing.save();
  }
  req.flash("success", "listing updated successfully");
  res.redirect(`/listings/${id}`);
};

module.exports.destroylisting = async (req, res) => {
  let { id } = req.params;
  let deletedlistings = await Listing.findByIdAndDelete(id);
  req.flash("success", "listing Deleted successfully");
  res.redirect("/listings");
};
