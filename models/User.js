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

  licenseToken: {
    type: String,
    default: "",
  },

  subscriptionStatus: {
    type: String,
    default: "trial",
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  plan: {
    type: String,
    default: "free",
  },

  expiryDate: {
    type: Date,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);