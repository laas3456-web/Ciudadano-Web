const express = require('express');
const router = express.Router();

// Importar el controlador
const { iniciarSesion } = require('../controllers/loginController');

// Ruta POST para iniciar sesión
router.post('/', iniciarSesion);

module.exports = router;
