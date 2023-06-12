const formidable = require("formidable");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");
const User = require("../models/User.js");

const frmPerfil = async (req, res) => {

    try {
        const user = await User.findById(req.user.id);
        return res.render("perfil", {user:req.user, imagen: user.imagen});
    } catch (error) {
        req.flash('mensajes', [{msg: 'Error al leer el usuario'}]);
        return res.render("perfil");
    }
};

const editarFotoPerfil = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.maxFileSize = 50 * 1024 * 1024; // 50MB

  //procesamos la img
  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        throw new Error("Falló subida de imagen");
      }

      console.log(fields);
      //console.log(files.myFile)

      //Validate
      const file = files.myFile;

      if (file.originalFilename === "") {
        throw new Error("Agrega una Imagen por favor");
      }

      // if(!(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')){
      //     throw new Error('Por favor agrega una Imagen .jpg o png')
      // }

      const imageType = ["image/jpeg", "image/png"];

      if (!imageType.includes(file.mimetype)) {
        throw new Error("Por favor agrega una Imagen .jpg o png");
      }

      if (file.size > 50 * 1024 * 1024) {
        throw new Error("Menos de 5MB por favor");
      }

      //creamos la extension
      const extension = file.mimetype.split("/")[1];
      //ruta donde se guardara la img
      const dirFile = path.join(
        __dirname,
        `../public/image/perfiles/${req.user.id}.${extension}`
      );
      //console.log(dirFile)

      //Guarda la imagen
      fs.renameSync(file.filepath, dirFile);

      //redimencionar la imagen
      const image = await Jimp.read(dirFile);
      image.resize(200, 200).quality(90).writeAsync(dirFile);

      //guarda la referencia de la imagen en la base de datos
      const user = await User.findById(req.user.id); //consulta DB
      user.imagen = `${req.user.id}.${extension}`;
      await user.save(); //guarda ref DB

      req.flash("mensajes", [{ msg: "Imagen subida éxitosamente" }]);
    } catch (error) {
      req.flash("mensajes", [{ msg: error.message }]);
    } finally {
      return res.redirect("/perfil");
    }
  });
};

module.exports = {
  frmPerfil,
  editarFotoPerfil,
};
