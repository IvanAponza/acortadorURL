const express = require('express');
const { mostrarUrls, agregarUrl, eliminarUrl, frmEditarUrl, editarUrl } = require('../controllers/homeController');
const validarUrl = require('../middlewares/validarUrl.js');

const router = express.Router()

router.get('/', mostrarUrls);
router.post('/', validarUrl, agregarUrl);
router.get('/editar/:id', frmEditarUrl);
router.post('/editar/:id', validarUrl, editarUrl);
router.get('/eliminar/:id', eliminarUrl);

module.exports = router;