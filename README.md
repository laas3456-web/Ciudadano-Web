# 🏛️ CiudadanoApp - Backend

Backend para la plataforma CiudadanoApp, desarrollado con Node.js, Express y PostgreSQL. Este módulo gestiona el registro e inicio de sesión de usuarios, sirve formularios HTML desde el frontend y aplica buenas prácticas de modularización, seguridad y documentación técnica.

---

## 📦 Estructura del proyecto

Backend/ ├── controllers/ # Lógica de negocio (registro, login) │ ├── registroController.js │ └── loginController.js ├── routes/ # Rutas Express │ ├── registro.js │ └── login.js ├── models/ # Consultas SQL encapsuladas │ └── usuarioModel.js ├── middlewares/ # Validaciones previas │ └── validarCampos.js ├── utils/ # Funciones auxiliares │ └── encriptar.js ├── db.js # Conexión a PostgreSQL ├── server.js # Configuración principal del servidor ├── .env # Variables de entorno └── README.md # Documentación técnica

Código

---

## 🚀 Instalación y ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu_usuario/ciudadanoapp-backend.git
   cd ciudadanoapp-backend
Instala las dependencias:

bash
npm install
Configura el archivo .env:

env
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ciudadano_app
PORT=3000
Inicia el servidor:

bash
npm run dev
📮 Endpoints disponibles
🔐 Registro de usuario
POST /api/registro

Body esperado:

json
{
  "nombre": "Luis",
  "email": "luis@example.com",
  "contraseña": "segura123"
}
Respuestas:

201 Created: Usuario registrado

409 Conflict: Email ya registrado

400 Bad Request: Campos incompletos

🔑 Inicio de sesión
POST /api/login

Body esperado:

json
{
  "email": "luis@example.com",
  "contraseña": "segura123"
}
Respuestas:

200 OK: Bienvenida

401 Unauthorized: Contraseña incorrecta

404 Not Found: Usuario no encontrado

🧠 Flujo de datos
El usuario envía datos desde el formulario HTML.

Express recibe la petición y la redirige a la ruta correspondiente.

El middleware validarCampos verifica que los campos estén completos.

El controlador (registroController o loginController) aplica la lógica.

El modelo (usuarioModel) ejecuta las consultas SQL.

Se devuelve una respuesta clara al frontend.

🧪 Pruebas recomendadas
Postman para probar los endpoints /api/registro y /api/login.

pgAdmin para verificar la tabla usuarios.

Formularios HTML ubicados en la carpeta Frontend/.

🛡️ Buenas prácticas aplicadas
Separación de responsabilidades (MVC).

Encriptación de contraseñas con bcryptjs.

Validación de campos con middleware.

Uso de variables de entorno con dotenv.

Modularización clara para escalabilidad.

📌 Requisitos
Node.js v22+

PostgreSQL 14+

npm

Editor compatible (VS Code recomendado)