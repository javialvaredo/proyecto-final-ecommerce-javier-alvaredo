# 🛒 API de Productos con Firestore

Esta es una API REST construida con **Node.js + Express** que gestiona un catálogo de productos usando **Google Firestore** como base de datos.
Los productos tienen un ID numérico incremental personalizado (`productId`), y se pueden listar, crear, actualizar y eliminar.
Utiliza arquitectura api rest (modelo, servicio, controlador) separando las responsabilidades para facilitar el mantenimiento y crecimiento del proyecto 

---

## 📦 Estructura del proyecto

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


## Credenciales
Utiliza un archivo .env con las credenciales de Firebase:

FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu_proyecto
FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
FIREBASE_APP_ID=tu_app_id

## Endpoints disponibles:
GET api/products
GET api/products/:id
POST api/products
PUT api/products/:id
DELETE /products/:id

✅ Requisitos
Node.js v16 o superior
Cuenta en Firebase con Firestore habilitado

🙌 Autor
Desarrollado por javialvaredo