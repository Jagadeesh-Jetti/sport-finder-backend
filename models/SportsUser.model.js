const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SportsUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const SportsUser = mongoose.model("SportsUser", SportsUserSchema);

module.exports = SportsUser;
