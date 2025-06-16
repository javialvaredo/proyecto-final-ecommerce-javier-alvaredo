import express from "express";

import {
  getAllProducts,
  getProductById,
  createProduct
} from "../controllers/products.controller.js";

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);

export default router;
