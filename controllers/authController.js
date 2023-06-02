const User = require("../models/User");
const { nanoid } = require("nanoid");

//Renderiza vista registro usuarios
const registroForm = async (req, res) => {
  res.render("registro");
};
//Renderiza vista login usuarios
const loginForm = async (req, res) => {
  res.render("login");
};

//Guardar usuarios DB
const guardarUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) throw new Error("Ya existe el usuario");

    user = new User({ userName, email, password, tokenConfirm: nanoid() });
    await user.save();

    //Envío correo confirm cunta del usuario

    return res.json(user);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

//confirmar cuanta usuario
//login usuarios
//cerrar session usuarios

module.exports = {
  registroForm,
  loginForm,
  guardarUser,
};
