import { Router } from "express";

import {
  getAllProducts,
  getProductById,
  getProductsByFilter,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/products.controller.js";

const router = Router();

router.get('/products', getAllProducts);
router.get('/products/filter', getProductsByFilter);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);



export default router;
