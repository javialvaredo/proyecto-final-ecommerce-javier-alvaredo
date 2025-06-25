import * as ProductModel from '../models/products.model.js';

export async function getAllProducts() {
  return await ProductModel.getAllProducts();
}

export async function getProductById(id) {
  if (!id) throw new Error('ID es requerido');
  return await ProductModel.getProductById(id);
}

export async function createProduct(data) {
  const required = ['nombre', 'categoria', 'descripcion', 'color', 'precio', 'stock'];
  for (const field of required) {
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

  return await ProductModel.createProductWithNumericId(newProduct);
}

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

  return await ProductModel.updateProduct(id, updatedProduct);
}

export async function deleteProduct(id) {
  if (!id) throw new Error('ID es requerido');
  return await ProductModel.deleteProduct(id);
}
