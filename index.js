import express from "express";
import cors from "cors";
import {join, dirname} from "path";
import { fileURLToPath } from "url";

import productsRouter from "./src/routes/products.routes.js";
import usersRouter from "./src/routes/users.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000; //usa el puerto del hosting si no el 3000

// Configuracion básica (permitir todos los orígenes)
app.use(cors()); 

// Middleware para parsear JSON
app.use(express.json()); 

//Middleware para servir archivos estáticos 
app.use(express.static(join(__dirname, 'public')));

//aqui van las rutas
app.use('/api', productsRouter);

app.use('/api', usersRouter);

console.log("Sirviendo archivos estáticos desde:", join(__dirname, 'public'));

// Middleware para manejar errores 404 
app.use((req, res, next) => { 
    res.status(404).send('Recurso no encontrado o ruta inválida'); 
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en  http://localhost:${PORT}`)
});





