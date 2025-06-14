import express from "express";

import products from "../models/modelo.js"

const router = express.Router();

router.get('/products', (req, res) => {
    res.send(products);
});

router.get('/products/:id', (req, res) => {
      const id = parseInt(req.params.id);
        const itemId = products.find(product => product.id === id) ; 
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

