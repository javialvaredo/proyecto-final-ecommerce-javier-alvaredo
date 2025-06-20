import express from "express";
import cors from "cors";

import productsRouter from "./src/routes/products.routes.js";
import usersRouter from "./src/routes/users.routes.js";

const app = express();
const PORT = 3000;

// Configuracion básica (permitir todos los orígenes)
app.use(cors()); 

// Middleware para parsear JSON
app.use(express.json()); 

//aqui van las rutas
app.use('/api', productsRouter);

app.use('/api', usersRouter);



// Middleware para manejar errores 404 
app.use((req, res, next) => { 
    res.status(404).send('Recurso no encontrado o ruta inválida'); 
});

app.listen(PORT, () => console.log(`Servidor corriendo en  http://localhost:${PORT}`))

