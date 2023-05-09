const express = require('express');
const { mostrarUrls, agregarUrl } = require('../controllers/homeController');
const router = express.Router()

router.get('/', mostrarUrls),
router.post('/', agregarUrl)

module.exports = router;