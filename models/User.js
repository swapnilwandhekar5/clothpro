const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
    },

    ownerName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    businessCategory: {
      type: String,
      default: "Clothing",
    },

    upiId: {
      type: String,
      default: "swapnil@paytm",
    },

    shopId: {
      type: String,
      default: () =>
        "SHOP" + Math.floor(Math.random() * 1000000),
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);