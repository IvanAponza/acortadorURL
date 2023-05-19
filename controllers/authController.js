const User = require("../models/User");

//Renderiza vista registro usuarios
const registroForm = async (req, res) => {
  res.render("registro");
};
//Renderiza vista login usuarios
const loginForm = async (req, res) => {
  res.render("login");
};
//Guardar usuarios DB
//confirmar cuanta usuario
//login usuarios
//cerrar session usuarios

module.exports = {
  registroForm,
  loginForm,
};
