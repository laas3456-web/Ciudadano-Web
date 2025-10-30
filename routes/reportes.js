const express = require('express');
const router = express.Router();
const pool = require('../db');
const { verificarToken } = require('../middlewares/auth'); // Middleware que extrae usuario_id del token

router.post('/crear', verificarToken, async (req, res) => {
  const { asunto, mensaje } = req.body;
  const usuarioId = req.usuario.id; // extraído del token

  try {
    await pool.query(
      'INSERT INTO reportes (usuario_id, asunto, mensaje) VALUES ($1, $2, $3)',
      [usuarioId, asunto, mensaje]
    );
    res.status(201).json({ mensaje: 'Reporte guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar reporte:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

module.exports = router;

