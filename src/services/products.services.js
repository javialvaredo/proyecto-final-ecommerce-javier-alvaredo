import * as ProductModel from '../models/products.model.js';

export async function getAllProducts() {
  const products = await ProductModel.getAllProducts();
  return products;
};

export async function getProductById(id) {
  if (!id) throw new Error('ID es requerido');
  const product = await ProductModel.getProductById(id);
  return product;
};

export async function getProductsByFilter(filters) {
  if (!filters || Object.keys(filters).length === 0) {
    // Si no hay filtros, retornamos todos los productos
    return await ProductModel.getAllProducts();
  }
  
  const products = await ProductModel.getProductsByFilter(filters);
  return products;
}



export async function createProduct(data) {
  const required = ['nombre', 'categoria', 'descripcion', 'color', 'precio', 'stock']; //Se define un array con los campos obligatorios que debe tener data
  for (const field of required) { // bucle que verifica que el campo nbo esta vacio
    if (!data[field]) throw new Error(`Campo requerido: ${field}`);
  }

  const newProduct = {
    nombre: data.nombre,
    categoria: data.categoria,
    descripcion: data.descripcion,
    color: data.color,
    precio: Number(data.precio),
    stock: Number(data.stock),
  };

  const product = await ProductModel.createProductWithNumericId(newProduct);
  return product;
};

export async function updateProduct(id, data) {
  if (!id) throw new Error('ID es requerido');
  const required = ['nombre', 'categoria', 'descripcion', 'color', 'precio', 'stock'];
  for (const field of required) {
    if (!data[field]) throw new Error(`Campo requerido: ${field}`);
  }

  const updatedProduct = {
    nombre: data.nombre,
    categoria: data.categoria,
    descripcion: data.descripcion,
    color: data.color,
    precio: Number(data.precio),
    stock: Number(data.stock),
  };

  const product = await ProductModel.updateProduct(id, updatedProduct);
  return product;
}

export async function deleteProduct(id) {
  if (!id) throw new Error('ID es requerido');
  const product = await ProductModel.deleteProduct(id);
  return product;
}
