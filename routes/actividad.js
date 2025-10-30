// routes/actividad.js
const express = require('express');
const router = express.Router();
const { obtenerActividadUsuario } = require('../controllers/actividadController');
const { verificarToken } = require('../middlewares/auth');

// Ruta protegida para obtener estadísticas de actividad
router.get('/', verificarToken, obtenerActividadUsuario);

module.exports = router;
