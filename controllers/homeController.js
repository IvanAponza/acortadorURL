const { nanoid } = require("nanoid");
const Url = require("../models/Url.js");

//Mostrar URLs
const mostrarUrls = async (req, res) => {
  try {
    const urls = await Url.find().lean();
    res.render("home", { urls: urls });
  } catch (error) {
    console.log(error);
    res.send("Algo falló...");
  }
};
//Crear URLs
const agregarUrl = async (req, res) => {
  const { origin } = req.body;

  try {
    const url = new Url({ origin, shortUrl: nanoid(6) });
    await url.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

//Formulario para Editar URLs
const frmEditarUrl = async (req, res) => {
  const { id } = req.params;

  try {
    const url = await Url.findById(id).lean();
    return res.render("home", { url });
  } catch (error) {
    console.log(error);
    return res.send("Falló algo...");
  }
};
//Editar URLs
const editarUrl = async (req, res) => {
  const { id } = req.params;
  const { origin } = req.body;

  try {
    const url = await Url.findById(id);
    await url.updateOne({ origin });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.send("Falló algo...");
  }
};

//Eliminar URLs
const eliminarUrl = async (req, res) => {
  const { id } = req.params;

  try {
    await Url.findByIdAndDelete(id);
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.send("Falló algo...");
  }
};

//Redirecciona la URLs
const redireccionarUrl = async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const dbUrl = await Url.findOne({ shortUrl: shortUrl});
    return res.redirect(dbUrl.origin);
  } catch (error) {
    console.log(error);
    return res.redirect("auth/login");
  }
};

module.exports = {
  mostrarUrls,
  agregarUrl,
  eliminarUrl,
  frmEditarUrl,
  editarUrl,
  redireccionarUrl,
};
