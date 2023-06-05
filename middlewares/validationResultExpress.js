const { validationResult, body } = require("express-validator");

const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("mensajes", errors.array());
    return res.redirect("/auth/registro");
  }
  next();
};

const bodyRegistroValidation = [
  body("userName", "Ingrese un nombre valido").trim().notEmpty().escape(),
  body("email", "Ingrese un email valido").trim().isEmail().normalizeEmail(),
  body("password", "Minimo 5 caracteres").trim().isLength({ min: 5 }),
  body("password", "Password incorrecto").custom((value, { req }) => {
    if (value !== req.body.repassword) {
      throw new Error("Contraseña no coinciden");
    }
    return value;
  }),
  validationResultExpress,
];

const bodyLoginValidation = [
  body("userName", "Ingrese un nombre valido").trim().notEmpty().escape(),
  body("email", "Ingrese un email valido").trim().isEmail().normalizeEmail(),
  body("password", "Minimo 5 caracteres").trim().isLength({ min: 5 }),
  body("password", "Password incorrecto").custom((value, { req }) => {
    if (value !== req.body.repassword) {
      throw new Error("Contraseña no coinciden");
    }
    return value;
  }),
  validationResultExpress,
];



module.exports = {
    bodyRegistroValidation,
    bodyLoginValidation,
}
