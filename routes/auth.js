const {Router} = require('express');
const { registroForm, loginForm } = require('../controllers/authController');
const router = Router();

router.get("/registro", registroForm);
router.get("/login", loginForm);


module.exports = router;