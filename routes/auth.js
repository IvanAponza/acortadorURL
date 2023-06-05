const { Router } = require("express");
const {
  registroForm,
  loginForm,
  guardarUser,
  confirmarCuenta,
  loginUser,
} = require("../controllers/authController");
const {
  bodyUserValidations, bodyRegistroValidation, bodyLoginValidation,
} = require("../middlewares/validationResultExpress");
const router = Router();

router.get("/registro", registroForm);
router.get("/login", loginForm);
router.post("/registro", [bodyRegistroValidation], guardarUser);
router.get("/confirmarCuenta/:token", confirmarCuenta);
router.post("/login", [bodyLoginValidation], loginUser);

module.exports = router;
