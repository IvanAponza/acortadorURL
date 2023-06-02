const {Router} = require('express');
const { registroForm, loginForm, guardarUser, confirmarCuenta } = require('../controllers/authController');
const router = Router();

router.get("/registro", registroForm);
router.get("/login", loginForm);
router.post("/registro", guardarUser);
router.get("/confirmarCuenta/:token", confirmarCuenta);


module.exports = router;