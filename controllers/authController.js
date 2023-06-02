require("dotenv").config();
const User = require("../models/User");
const { nanoid } = require("nanoid");
const nodemailer = require("nodemailer");

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
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
          user: process.env.MAILTRA_USER,
          pass: process.env.MAILTRA_PASSWORD
      }
  });
  await transport.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: user.email, // A quien le enviamos email
      subject: "Verifica tu cuenta de correo ✔", // Subject line
      //text: "Hello world?", // plain text body
      html: `<a href="http://localhost:4000/auth/confirmarCuenta/${user.tokenConfirm}">Verifica tu cuenta aquí</a>`, // html body
  });

    return res.json(user);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

//confirmar cuanta usuario
const confirmarCuenta = async (req, res) => {
  const {token} = req.params;
  try {
    const user = await User.findOne({tokenConfirm: token});
    if(!user) throw new Error("No existe el usuario");

    user.cuentaConfirm = true; //confirma cuenta
    user.tokenConfirm = null; //Elimina token
    await user.save();

    return res.redirect('/auth/registro');
  } catch (error) {
    return res.json({error: error.message});    
  }
}

//login usuarios
//cerrar session usuarios

module.exports = {
  registroForm,
  loginForm,
  guardarUser,
  confirmarCuenta,
};
