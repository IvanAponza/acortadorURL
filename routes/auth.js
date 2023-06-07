const { Router } = require("express");
const {
  registroForm,
  loginForm,
  guardarUser,
  confirmarCuenta,
  loginUser,
  cerrarSession,
} = require("../controllers/authController");
const {
  bodyRegistroValidation, bodyLoginValidation,
} = require("../middlewares/validationResultExpress");
const router = Router();

router.get("/registro", registroForm);
router.get("/login", loginForm);
router.post("/registro", [bodyRegistroValidation], guardarUser);
router.get("/confirmarCuenta/:token", confirmarCuenta);
router.post("/login", [bodyLoginValidation], loginUser);
router.get("/logout", cerrarSession)

module.exports = router;
