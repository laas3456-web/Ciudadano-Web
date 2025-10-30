const pool = require('../db');
const { comparar } = require('../utils/encriptar'); // Tu función personalizada
const jwt = require('jsonwebtoken');

// Controlador para iniciar sesión
async function iniciarSesion(req, res) {
  const { email, contraseña } = req.body;

  try {
    // 🧪 Validación básica
    if (!email || !contraseña) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    // 🔍 Buscar usuario por email
    const resultado = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const usuario = resultado.rows[0];

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // 🔐 Comparar contraseña
    const coincide = await comparar(contraseña, usuario.contraseña);
    if (!coincide) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // 🪪 Generar token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // ✅ Respuesta con token y datos básicos
    res.status(200).json({
      mensaje: `Bienvenido, ${usuario.nombre}`,
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

module.exports = { iniciarSesion };


