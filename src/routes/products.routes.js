import express from "express";

import products from "../models/modelo.js"

const router = express.Router();

/* router.get('/products', (req, res) => {
    res.send(products);
}); */

// filtado de datos por query 
router.get('/products', (req, res) => {
  const { nombre, categoria, color, precio } = req.query;

  let resultados = products;

  if (nombre) {
    resultados = resultados.filter(p =>
      p.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  }

  if (categoria) {
    resultados = resultados.filter(p =>
      p.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }

  if (color) {
    resultados = resultados.filter(p =>
      p.color.toLowerCase() === color.toLowerCase()
    );
  }

  if (precio) {
    // Convertimos precio a número para comparar
    const precioNum = Number(precio);
    if (!isNaN(precioNum)) {
      resultados = resultados.filter(p => p.precio <= precioNum);
    }
  }

  res.json({
    status: 200,
    count: resultados.length,
    data: resultados
  });
});



router.get('/products/:id', (req, res) => {
      const id = parseInt(req.params.id);
        const itemId = products.find(product => product.id === id) ; 
        
        if (!itemId) {
            return res.status(404).json({
            status: 404,
            message: "Producto no encontrado"
   });
  }
        res.status(200).json( {
        status: 200,
        message: "item encontrado",
        data: itemId
    });
});

router.post('/products', (req, res) => {
    res.send('Producto creado')
});


export default router;

