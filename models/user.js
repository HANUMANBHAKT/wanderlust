const mongoose = require("mongoose");

const schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new schema({
  email: {
    type: String,
  },
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);
