const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  shopId: String,
  shopName: String,

  customerName: String,
  phone: String,

  totalCredit: {
    type: Number,
    default: 0,
  },

  totalPaid: {
    type: Number,
    default: 0,
  },

  balance: {
    type: Number,
    default: 0,
  },

  notes: String,

  transactions: [
    {
      type: {
        type: String,
        enum: ["credit", "payment"],
      },
      amount: Number,
      description: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Customer", customerSchema);