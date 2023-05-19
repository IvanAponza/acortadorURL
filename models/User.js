const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    index: { unique: true },
  },
  passwor: {
    type: String,
    required: true,
  },
  tokenConfirm: {
    type: String,
    default: null,
  },
  cuentaConfirm: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', userSchema);
