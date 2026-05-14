const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  shopName: String,
  ownerName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  shopId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);