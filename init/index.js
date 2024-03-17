const mongoose = require("mongoose");
const initdata = require("./data");
// const Listing = require("./models/listing.js");
const Listing = require("../models/listing.js");

main().then(() => console.log("connected to db"));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "65ef5b3784ef1c13d177f596",
  }));
  await Listing.insertMany(initdata.data);
  console.log("Data inserted");
};

initDB();
