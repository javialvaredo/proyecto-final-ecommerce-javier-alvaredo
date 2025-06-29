# 🛒 API REST con Node.js, Express y Firestore

Esta es una API REST construida con **Node.js + Express** que gestiona un catálogo de productos y usuarios, utilizando **Google Firestore** como base de datos.

- Se aplica una arquitectura en capas (`modelo`, `servicio`, `controlador`) para mantener el código modular y escalable.
- Las contraseñas de usuario se almacenan de forma segura utilizando **bcrypt**.
- La autenticación de usuarios se maneja con **JSON Web Tokens (JWT)**.

---

## 📁 Estructura del proyecto

/raíz-del-proyecto
├── .env
├── index.js
└── src/
    ├── controllers/
    │   └── products.controller.js
    ├── services/
    │   └── products.services.js
    ├── models/
    │   └── products.model.js
    ├── data/
    │   └── data.js               # Configuración de Firebase
    ├── routes/
    │   └── products.routes.js

---

## 🚀 Instalación y uso

### Clonar el repositorio e instalar las dependencia

```bash
git clone https://github.com/javialvaredo/api-productos-firestore.git
cd api-productos-firestore
npm install 
```

## Credenciales
Utiliza un archivo .env con las credenciales de Firebase:

FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu_proyecto
FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
FIREBASE_APP_ID=tu_app_id
SECRET_KEY = tu_contraseña


📦 Endpoints disponibles
📘 Productos

| Método | Ruta                | Descripción                   |
| ------ | ------------------- | ----------------------------- |
| GET    | `/api/products`     | Obtener todos los productos   |
| GET    | `/api/products/:id` | Obtener producto por ID       |
| POST   | `/api/products`     | Crear nuevo producto          |
| PUT    | `/api/products/:id` | Actualizar producto existente |
| DELETE | `/api/products/:id` | Eliminar producto             |


👤 Usuarios

| Método | Ruta             | Descripción                |
| ------ | ---------------- | -------------------------- |
| GET    | `/api/users`     | Obtener todos los usuarios |
| GET    | `/api/users/:id` | Obtener usuario por ID     |
| POST   | `/api/users`     | Crear nuevo usuario        |
| PUT    | `/api/users/:id` | Actualizar usuario         |
| DELETE | `/api/users/:id` | Eliminar usuario           |

🔐 Autenticación

| Método | Ruta               | Descripción                   |
| ------ | ------------------ | ----------------------------- |
| POST   | `/api/users/login` | Iniciar sesión (devuelve JWT) |


🧪 Ejemplo de login con Postman
POST /api/users/login
{
  "email": "juan.perez@gmail.com",
  "password": "contraseña123"
}

Respuesta exitosa:
{
  "status": 200,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}


✅ Requisitos
Node.js v16 o superior
Cuenta en Firebase con Firestore habilitado

🙌 Autor
Desarrollado por javialvaredo