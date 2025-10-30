
// controllers/reportesController.js
const pool = require('../db');

const enviarReporte = async (req, res) => {
  try {
    const { nombre, correo, asunto, mensaje } = req.body;
    await pool.query(
      'INSERT INTO reportes (nombre, correo, asunto, mensaje) VALUES ($1, $2, $3, $4)',
      [nombre, correo, asunto, mensaje]
    );
    res.status(200).send('Reporte enviado correctamente');
  } catch (error) {
    console.error('Error al enviar reporte:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = { enviarReporte };
