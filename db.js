// db.js
const { Pool } = require('pg');

let pool;

if (process.env.DATABASE_URL) {
  // Producción: usa connection string completa + SSL
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Render/Neon/Supabase
  });
} else {
  // Desarrollo local (pgAdmin4)
  pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ciudadano_app',
  });
}

pool.on('error', (err) => {
  console.error('💥 Error inesperado en el pool PG:', err);
  process.exit(1);
});

module.exports = pool;


