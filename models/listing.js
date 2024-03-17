const mongoose = require("mongoose");

const schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new schema({
  title: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
    // required: true,
  },
  location: {
    type: String,
    // required: true,
  },
  country: {
    type: String,
    // required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  reviews: [{ type: schema.Types.ObjectId, ref: "Review" }],
  owner: {
    type: schema.Types.ObjectId,
    ref: "user",
  },
  category: {
    type: String,
  },
});

listingSchema.post("findOneAndDelete", async function (listing) {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
