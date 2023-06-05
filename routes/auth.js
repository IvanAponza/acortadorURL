const { Router } = require("express");
const { body } = require("express-validator");
const {
  registroForm,
  loginForm,
  guardarUser,
  confirmarCuenta,
  loginUser,
} = require("../controllers/authController");
const router = Router();

router.get("/registro", registroForm);
router.get("/login", loginForm);
router.post(
  "/registro",
  [
    body("userName", "Ingrese un nombre valido").trim().notEmpty().escape(),
    body("email", "Ingrese un email valido").trim().isEmail().normalizeEmail(),
    body("password", "Minimo 5 caracteres").trim().isLength({ min: 5 }),
    body("password", "Password incorrecto").custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("Contraseña no coinciden");
      }
      return value;
    }),
  ],
  guardarUser
);
router.get("/confirmarCuenta/:token", confirmarCuenta);
router.post(
  "/login",
  [
    body("email", "Ingrese un email valido").trim().isEmail().normalizeEmail(),
    body("password", "Minimo 5 caracteres")
      .trim()
      .isLength({ min: 5 })
      .escape(),
  ],
  loginUser
);

module.exports = router;
