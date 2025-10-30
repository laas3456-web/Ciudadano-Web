const express = require('express');
const router = express.Router();

// Importar el controlador
const { registrarUsuario } = require('../controllers/registroController');

// Ruta POST para registrar usuario
router.post('/', registrarUsuario);

module.exports = router;
