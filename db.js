const { Pool } = require('pg');
require('dotenv').config();

// Crear una instancia de conexión
const pool = new Pool({
  user: process.env.DB_USER,       // Usuario de la base de datos
  host: process.env.DB_HOST,       // Host (localhost o IP)
  database: process.env.DB_NAME,   // Nombre de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña
  port: process.env.DB_PORT        // Puerto (5432 por defecto)
});

// Verificar conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error al conectar a PostgreSQL:', err.stack);
  } else {
    console.log('✅ Conexión exitosa a PostgreSQL');
    release(); // Liberar el cliente
  }
});

module.exports = pool;
