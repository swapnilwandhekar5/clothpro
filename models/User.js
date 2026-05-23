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

    gstNumber: {
      type: String,
      default: "",
    },

    businessAddress: {
      type: String,
      default: "",
    },

    businessState: {
      type: String,
      default: "Maharashtra",
    },

    stateCode: {
      type: String,
      default: "27",
    },

    businessMobile: {
      type: String,
      default: "",
    },

    businessEmail: {
      type: String,
      default: "",
    },

    logoUrl: {
      type: String,
      default: "",
    },

    stampUrl: {
      type: String,
      default: "",
    },

    bankName: {
      type: String,
      default: "",
    },

    accountNumber: {
      type: String,
      default: "",
    },

    ifscCode: {
      type: String,
      default: "",
    },

    upiId: {
      type: String,
      default: "",
    },

    shopId: {
      type: String,
      default: () =>
        "SHOP" + Math.floor(Math.random() * 1000000),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
