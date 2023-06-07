const { nanoid } = require("nanoid");
const Url = require("../models/Url.js");

//Mostrar URLs
const mostrarUrls = async (req, res) => {
  //console.log(req.user.id)
  try {
    const urls = await Url.find({ user: req.user.id }).lean();
    res.render("home", { urls: urls });
  } catch (error) {
    // console.log(error);
    // res.send("Algo falló...");
    req.flash("mensajes", [{ msg: error.message }]);
    return res.status(304).redirect("/");
  }
};
//Crear URLs
const agregarUrl = async (req, res) => {
  //console.log(req.user.id)
  const { origin } = req.body;

  try {
    const url = new Url({ origin, shortUrl: nanoid(6), user: req.user.id });
    await url.save();
    req.flash('mensajes', [{msg: 'URL AGREGADA'}])
    return res.status(304).redirect("/");
  } catch (error) {
    // console.log(error);
    req.flash('mensajes', [{ msg: error.message }])
    return res.status(304).redirect("/");
  }
};

//Formulario para Editar URLs
const frmEditarUrl = async (req, res) => {
  //console.log(req.user.id)
  const { id } = req.params;

  try {
    const url = await Url.findById(id).lean(); // trae la url

    //valida si no es el usuario
    if(!url.user.equals(req.user.id)){
      throw new Error('No te pertenece esta URL')
    }

    return res.render("home", { url });
  } catch (error) {
    // console.log(error);
    // return res.send("Falló algo...");
    req.flash('mensajes', [{ msg: error.message }])
    return res.status(304).redirect("/");
  }
};
//Editar URLs
const editarUrl = async (req, res) => {
  //console.log(req.user.id)
  const { id } = req.params;
  const { origin } = req.body;

  try {
    const url = await Url.findById(id); //trae la url

    //valida si no es el usuario
    if(!url.user.equals(req.user.id)){
      throw new Error('No te pertenece esta URL')
    }
    await url.updateOne({ origin });

    req.flash('mensajes', [{msg: 'URL EDITADA'}]);
    return res.status(304).redirect("/");
  } catch (error) {
    // console.log(error);
    // return res.send("Falló algo...");
    req.flash('mensajes', [{msg: error.message}]);
    return res.status(304).redirect("/");
  }
};

//Eliminar URLs
const eliminarUrl = async (req, res) => {
  //console.log(req.user.id)
  const { id } = req.params;

  try {
    //await Url.findByIdAndDelete(id);
    const url = await Url.findById(id); //trea la url

    //valida si no es el usuario
    if(!url.user.equals(req.user.id)){
      throw new Error('No te pertenece esta URL');
    }
    await url.deleteOne();

    req.flash('mensajes', [{msg: 'URL ELIMINADA'}])
    return res.status(304).redirect("/");
  } catch (error) {
    req.flash('mensajes', [{msg: error.message}]);
    return res.status(304).redirect("/");
  }
};

//Redirecciona la URLs
const redireccionarUrl = async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const dbUrl = await Url.findOne({ shortUrl });
    return res.status(304).redirect(dbUrl.origin);
  } catch (error) {
    console.log(error);
    req.flash('mensajes', [{msg: 'No existe la URL configurada'}]);
    return res.status(304).redirect("auth/login");
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
