const pool = require('../db');

async function obtenerPerfil(req, res) {
  try {
    const usuarioId = req.usuario.id; // extraído del token por el middleware
    const resultado = await pool.query(
      'SELECT nombre, email, telefono, ciudad FROM usuarios WHERE id = $1',
      [usuarioId]
    );
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = { obtenerPerfil };
