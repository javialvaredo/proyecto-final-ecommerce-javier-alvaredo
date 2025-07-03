import * as productsService from "../services/products.services.js";


const getAllProducts = async (req, res) => {
  try {
    const resultados = await productsService.getAllProducts(); //funcion del controlador le pide resuldados al services (y el services al modelo (bd) )

    res.status(200).json({
    status: 200,
    count: resultados.length, // muestra la cantidad de registros
    data: resultados, //el array de productos
  });

} catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error al obtener los productos",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const itemId = await productsService.getProductById(id);

    if (!itemId) {
      return res.status(404).json({ //return envia mensaje y detiene la ejecucion
        status: 404,
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Producto encontrado",
      data: itemId,
    });

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error al obtener el producto",
      error: error.message,
    });
  }
};


const createProduct = async (req, res) => {
  try {
    const { nombre, categoria, descripcion, color, precio, stock } = req.body; //destructuracion para obtener los datos 

    if (!nombre || !categoria || !descripcion || !color || !precio || !stock) {
      return res.status(400).json({
        status: 400,
        message: "Todos los campos son obligatorios",
      });
    }

    const newProduct = await productsService.createProduct({  //se llama al servicio para que guarde los datos
       nombre,
       categoria,
       descripcion,
       color,
       precio,
       stock,
    });
    
    res.status(201).json({
      status: 201,
      message: "Producto creado",
      data: newProduct,
    });

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error al crear el producto",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, categoria, descripcion, color, precio, stock } = req.body;

    if (!nombre && !categoria && !descripcion && !color && !precio && !stock) {
      return res.status(400).json({
        status: 400,
        message: "Debe haber al menos un campo para actualizar",
      });
    }
    const updateProduct = await productsService.updateProduct(id, {
      nombre,
      categoria,
      descripcion,
      color,
      precio,
      stock,
    });

    if (!updateProduct) {
      return res.status(404).json({
        status: 404,
        message: "producto no encontrado"
      });
    }
    
    res.status(200).json({
      status: 200,
      message: "Producto modificado",
      data: updateProduct,
    });

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error al modificar el producto",
      error: error.message,
    });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await productsService.deleteProduct(id);

    if (!deleted) {
      return res.status(404).json({
        status: 404,
        message: "Producto no encontrado"
      });
    }
    
    res.status(200).json({
      status: 200,
      message: "Producto eliminado",
      data: deleted,
    });

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error al eliminar el producto",
      error: error.message,
    });
  }
};


export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
