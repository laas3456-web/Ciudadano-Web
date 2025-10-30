const pool = require('../db');
const { encriptar } = require('../utils/encriptar'); // ✅ Encriptación personalizada
const jwt = require('jsonwebtoken'); // ✅ Para generar el token

// Controlador para registrar usuario
async function registrarUsuario(req, res) {
  const { nombre, email, contraseña, telefono, ciudad } = req.body;

  try {
    // 🧪 Validación básica
    if (!nombre || !email || !contraseña || !telefono || !ciudad) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    // 🔍 Verificar si el usuario ya existe
    const existe = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (existe.rows.length > 0) {
      return res.status(409).json({ mensaje: 'El correo ya está registrado' });
    }

    // 🔐 Encriptar la contraseña
    const contraseñaSegura = await encriptar(contraseña);

    // 📝 Insertar en la base de datos
    const resultado = await pool.query(
      'INSERT INTO usuarios (nombre, email, contraseña, telefono, ciudad) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [nombre, email, contraseñaSegura, telefono, ciudad]
    );

    const nuevoUsuarioId = resultado.rows[0].id;

    // 🪪 Generar token JWT
    const token = jwt.sign({ id: nuevoUsuarioId, email }, process.env.JWT_SECRET, { expiresIn: '2h' });

    // ✅ Respuesta con token y datos básicos
    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      token,
      usuario: {
        id: nuevoUsuarioId,
        nombre,
        email,
        telefono,
        ciudad
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

module.exports = { registrarUsuario };
