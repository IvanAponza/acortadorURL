const express = require('express');
const { mostrarUrls, agregarUrl, eliminarUrl, frmEditarUrl, editarUrl } = require('../controllers/homeController');
const router = express.Router()
const validarUrl = require('../middlewares/validarUrl.js');

router.get('/', mostrarUrls);
router.post('/', validarUrl, agregarUrl);
router.get('/editar/:id', frmEditarUrl);
router.post('/editar/:id', validarUrl, editarUrl);
router.get('/eliminar/:id', eliminarUrl);

module.exports = router;