const express = require('express');
const { mostrarUrls, agregarUrl, eliminarUrl, frmEditarUrl, editarUrl, redireccionarUrl } = require('../controllers/homeController');
const validarUrl = require('../middlewares/validarUrl.js');
const verificarUser = require('../middlewares/verificarUser.js');

const router = express.Router()

router.get('/', verificarUser, mostrarUrls);
router.post('/', verificarUser, validarUrl, agregarUrl);
router.get('/editar/:id', verificarUser, frmEditarUrl);
router.post('/editar/:id', verificarUser, validarUrl, editarUrl);
router.get('/eliminar/:id', verificarUser, eliminarUrl);
router.get('/:shortUrl', redireccionarUrl);

module.exports = router;