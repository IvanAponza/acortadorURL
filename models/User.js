const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  userName: { type: String, required: true, lowercase: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    index: { unique: true },
  },
  password: { type: String, required: true },
  tokenConfirm: { type: String, default: null },
  cuentaConfirm: { type: Boolean, default: false },
});

//Hash passwords globally
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash; //save password
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Error al codificar la password");
  }
});

//Validate password globally
userSchema.comparePassword = async function (candidatePassword) {
  //compara y retorna la password
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
