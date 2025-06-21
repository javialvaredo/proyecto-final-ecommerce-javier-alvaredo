import products from "../models/products.model.js";

const getAllProducts = async () => {
    return products;
};

const getProductById = async (id) => {
    return products.find(product => product.id == id);
}

const createProduct = async (productData) => {
  
    const newProduct = {
        id: products.length + 1,
        nombre: productData.nombre,
        categoria: productData.categoria,
        color: productData.color,
        precio: Number(productData.precio),
    }
    
    products.push(newProduct); // Agregar al array en memoria
    return newProduct;
};

const updateProduct = async (id, updatedData) => {
  const index = products.findIndex(p => p.id == id);
  
  if (index === -1) {
    return null; // Producto no encontrado
  }

  const product = products[index];
  
  if (updatedData.nombre) {
    product.nombre = updatedData.nombre;
  }
  if (updatedData.categoria) {
    product.categoria = updatedData.categoria;
  }
  if (updatedData.color) {
    product.color = updatedData.color;
  }
  if (updatedData.precio) {
    product.precio = Number(updatedData.precio);
  }

  return product;
};


const deleteProduct = async (id) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1); // eliminamos el producto
  return true;
};


export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};