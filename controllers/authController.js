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
        pass: process.env.MAILTRA_PASSWORD,
      },
    });
    await transport.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: user.email, // A quien le enviamos email
      subject: "Verifica tu cuenta de correo ✔", // Subject line
      //text: "Hello world?", // plain text body
      html: `<a href="http://localhost:4000/auth/confirmarCuenta/${user.tokenConfirm}">Verifica tu cuenta aquí</a>`, // html body
    });

    //msg confirmar cuenta
    req.flash("mensajes", [
      { msg: "Revisa tu correo electrónico y confirma la cienta",}
    ]);

    return res.status(304).redirect('/auth/login');

    //return res.json(user);
  } catch (error) {
    //return res.json({ error: error.message });
    req.flash("mensajes", [{ msg: error.message }]);
    return res.status(304).redirect("/auth/login");
  }
};

//confirmar cuanta usuario
const confirmarCuenta = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ tokenConfirm: token });
    if (!user) throw new Error("No existe el usuario");

    user.cuentaConfirm = true; //confirma cuenta
    user.tokenConfirm = null; //Elimina token
    await user.save();

    req.flash("mensajes", [{ msg: "Cuenta verificada puedes iniciar session." }]);

    return res.redirect("/auth/registro");
  } catch (error) {
    // return res.json({ error: error.message });
    req.flash("mensajes", [{ msg: error.message }]);
    return res.status(304).redirect("/auth/login");
  }
};

//login usuarios
const loginUser = async (req, res) => {

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) throw new Error("No existe usuario");
    if (!user.cuentaConfirm) throw new Error("Falta confirmar la cuenta");
    if (!(await user.comparePassword(password)))
      throw new Error("Error contraseña");

    //crea session usuario a través de passport
    req.login(user, function (err) {
      if (err) throw new Error("Error al crear la sesión");
      return res.status(304).redirect("/");
    });

  } catch (error) {
    req.flash("mensajes", [{ msg: error.message }]);
    return res.status(304).redirect("/auth/login");
  }
};
//cerrar session usuarios
const cerrarSession = (req, res, next)=>{
  req.logout((err)=>{
    if(err) return next(err);
  })
  return res.status(304).redirect("/auth/login");
}

module.exports = {
  registroForm,
  loginForm,
  guardarUser,
  confirmarCuenta,
  loginUser,
  cerrarSession,
};
