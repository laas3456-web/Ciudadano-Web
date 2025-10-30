const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// Middleware para recibir datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos HTML desde la carpeta Frontend
app.use(express.static(path.join(__dirname, '../Frontend')));

// Rutas backend
const registroRouter = require('./routes/registro');
const loginRouter = require('./routes/login');
const perfilRouter = require('./routes/perfil');
const reportesRouter = require('./routes/reportes');
const actividadRouter = require('./routes/actividad');

app.use('/api/registro', registroRouter);
app.use('/api/login', loginRouter);
app.use('/api/usuarios', perfilRouter);
app.use('/api/reportes', reportesRouter);
app.use('/api/actividad', actividadRouter); // opcional

// Puerto
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
