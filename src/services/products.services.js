import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo JSON
const dataPath = path.join(__dirname, '../data/productos.json');

const readProducts = () => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
};

const writeProducts = (products) => {
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
};

// Obtener todos los productos
const getAllProducts = async () => {
  return readProducts();
};

// Buscar producto por ID
const getProductById = async (id) => {
  const products = readProducts();
  return products.find(product => product.id == id);
};

// Crear un nuevo producto
const createProduct = async (productData) => {
  const products = readProducts(); // lee el json y devuelve el array

  const newProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1, //busca el ultimo id y le suma1, si esta vacio: :1 le asigna 1
    nombre: productData.nombre,
    categoria: productData.categoria,
    color: productData.color,
    precio: Number(productData.precio),
  };

  products.push(newProduct);
  writeProducts(products);

  return newProduct;
};

// Actualizar producto por ID
const updateProduct = async (id, updatedData) => {
  const products = readProducts();
  const index = products.findIndex(p => p.id == id);

  if (index === -1) return null;

  const product = products[index];

  if (updatedData.nombre) product.nombre = updatedData.nombre;
  if (updatedData.categoria) product.categoria = updatedData.categoria;
  if (updatedData.color) product.color = updatedData.color;
  if (updatedData.precio) product.precio = Number(updatedData.precio);

  products[index] = product;
  writeProducts(products);

  return product;
};

// Eliminar producto por ID
const deleteProduct = async (id) => {
  const products = readProducts();
  const newProducts = products.filter(p => p.id != id);

  if (newProducts.length === products.length) return false;

  writeProducts(newProducts);
  return true;
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
