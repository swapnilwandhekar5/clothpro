// backend/models/Staff.js

const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    shopId: String,
    shopName: String,

    name: String,
    mobile: String,
    email: String,
    password: String,

    role: {
      type: String,
      default: "Staff",
    },

    status: {
      type: String,
      default: "Pending",
    },

    permissions: {
      dashboard: {
        type: Boolean,
        default: true,
      },
      inventory: {
        type: Boolean,
        default: true,
      },
      billing: {
        type: Boolean,
        default: true,
      },
      analytics: {
        type: Boolean,
        default: false,
      },
      khata: {
        type: Boolean,
        default: false,
      },
      supplier: {
        type: Boolean,
        default: false,
      },
      settings: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Staff ||
  mongoose.model("Staff", staffSchema);