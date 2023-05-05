const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 20000,
    },
     bankStatements: {
        type: Array,
        default: [],
      },
  },
  { timestamps: true }
);
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
