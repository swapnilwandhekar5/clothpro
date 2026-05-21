const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  shopId: String,
  shopName: String,

  ownerId: String,

  name: String,

  email: {
    type: String,
    unique: true,
  },

  password: String,

  phone: String,

  role: {
    type: String,
    default: "Cashier",
  },

  permissions: {
    dashboard: {
      type: Boolean,
      default: false,
    },

    inventory: {
      type: Boolean,
      default: false,
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

  salary: {
    type: Number,
    default: 0,
  },

  joiningDate: {
    type: String,
    default: "",
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Staff", staffSchema);