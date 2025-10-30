// 📦 Importar dependencias
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { verificarToken } = require('../middlewares/auth'); // Middleware JWT

// 👤 Ruta protegida para obtener el perfil del usuario
router.get('/perfil', verificarToken, async (req, res) => {
  try {
    const usuarioId = req.usuario.id; // Extraído desde el token por el middleware

    const resultado = await pool.query(
      'SELECT nombre, email, telefono, ciudad FROM usuarios WHERE id = $1',
      [usuarioId]
    );

    const datos = resultado.rows[0];

    if (!datos) {
      return res.status(404).json({ mensaje: 'Perfil no encontrado' });
    }

    // ✅ Respuesta estructurada para el frontend
    res.status(200).json({
      usuario: {
        nombre: datos.nombre,
        email: datos.email,
        telefono: datos.telefono,
        ciudad: datos.ciudad
      }
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// 📤 Exportar el router
module.exports = router;
