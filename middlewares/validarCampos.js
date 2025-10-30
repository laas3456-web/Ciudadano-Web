// Middleware para validar campos obligatorios
function validarCampos(req, res, next) {
  const { nombre, email, contraseña } = req.body;

  // Verifica que todos los campos estén presentes
  if (!nombre || !email || !contraseña) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  next(); // Si todo está bien, continúa al controlador
}

module.exports = validarCampos;
