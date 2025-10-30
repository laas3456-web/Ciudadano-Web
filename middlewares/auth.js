// Importamos el módulo jsonwebtoken, que permite crear y verificar tokens JWT
const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Token no proporcionado');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(403).send('Token inválido');
  }
};

module.exports = { verificarToken };
