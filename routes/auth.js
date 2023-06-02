const {Router} = require('express');
const { registroForm, loginForm, guardarUser } = require('../controllers/authController');
const router = Router();

router.get("/registro", registroForm);
router.get("/login", loginForm);
router.post("/registro", guardarUser);


module.exports = router;