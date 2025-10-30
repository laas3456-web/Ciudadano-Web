// 📦 Importar la librería bcryptjs
const bcrypt = require('bcryptjs');

// 🔐 Función para encriptar texto plano (usualmente contraseñas)
async function encriptar(textoPlano) {
  const hash = await bcrypt.hash(textoPlano, 10); // 10 rondas de sal para mayor seguridad
  return hash;
}

// 🔍 Función para comparar texto plano con un hash almacenado
async function comparar(textoPlano, hashAlmacenado) {
  const coincide = await bcrypt.compare(textoPlano, hashAlmacenado);
  return coincide; // true si coinciden, false si no
}

// 📤 Exportar funciones para uso en controladores
module.exports = {
  encriptar,
  comparar
};

