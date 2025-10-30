const pool = require('../db');

// 🔐 Verificar si el email ya está registrado
const buscarPorEmail = async (email) => {
  const resultado = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  return resultado.rows[0];
};

// 📝 Registrar nuevo usuario
const crearUsuario = async ({ nombre, email, telefono, ciudad, contraseña }) => {
  await pool.query(
    'INSERT INTO usuarios (nombre, email, telefono, ciudad, contraseña) VALUES ($1, $2, $3, $4, $5)',
    [nombre, email, telefono, ciudad, contraseña]
  );
};

// 👤 Obtener perfil del usuario
const obtenerPerfil = async (id) => {
  const resultado = await pool.query(
    'SELECT nombre, email, telefono, ciudad FROM usuarios WHERE id = $1',
    [id]
  );
  return resultado.rows[0];
};

// 📊 Obtener actividad del usuario
const obtenerActividad = async (id) => {
  const resultado = await pool.query(`
    SELECT
      COUNT(*) FILTER (WHERE estado = 'enviado') AS enviados,
      COUNT(*) FILTER (WHERE estado = 'en_proceso') AS en_proceso,
      COUNT(*) FILTER (WHERE estado = 'resuelto') AS resueltos
    FROM reportes
    WHERE usuario_id = $1
  `, [id]);
  return resultado.rows[0];
};

module.exports = {
  buscarPorEmail,
  crearUsuario,
  obtenerPerfil,
  obtenerActividad
};
