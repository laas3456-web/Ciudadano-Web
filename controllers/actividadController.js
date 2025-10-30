const pool = require('../db');

const obtenerActividadUsuario = async (req, res) => {
  try {
    const usuarioId = req.usuario.id; // Asume que el middleware de autenticación ya extrajo el ID

    const resultado = await pool.query(`
      SELECT
        COUNT(*) FILTER (WHERE estado = 'enviado') AS enviados,
        COUNT(*) FILTER (WHERE estado = 'en_proceso') AS en_proceso,
        COUNT(*) FILTER (WHERE estado = 'resuelto') AS resueltos
      FROM reportes
      WHERE usuario_id = $1
    `, [usuarioId]);

    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al obtener actividad del usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = { obtenerActividadUsuario };
