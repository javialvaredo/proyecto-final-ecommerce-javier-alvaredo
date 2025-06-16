// en desarrollo cuando se migre a base de datos implementara el await
import products from "../models/products.model.js";

const getAllProducts = async (req, res) => {
  try {
    const { nombre, categoria, color, precio } = req.query;

    let resultados = products; // array en memoria

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
      const precioNum = Number(precio);
      if (!isNaN(precioNum)) {
        resultados = resultados.filter(p => p.precio <= precioNum);
      }
    }

    res.status(200).json({
      status: 200,
      count: resultados.length,
      data: resultados,
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
    const id = parseInt(req.params.id);

    // Simulación de acceso asincrónico (aunque ahora sea local)
    const itemId = products.find(product => product.id === id);

    if (!itemId) {
      return res.status(404).json({
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
      if (!req.body) {
      return res.status(400).json({
        status: 400,
        message: "Metodo POST, el cuerpo de la solicitud está vacío",
      });
    } //  es para probar la funcion para que no de undefined 
    const { nombre, categoria, color, precio } = req.body;

    if (!nombre || !categoria || !color || !precio) {
      return res.status(400).json({
        status: 400,
        message: "Todos los campos son obligatorios",
      });
    }

    // Aquí se implementará la lógica real más adelante
    res.status(201).json({
      status: 201,
      message: "Producto creado",
      data: {
        nombre,
        categoria,
        color,
        precio: Number(precio),
      },
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
  if (!req.body) {
      return res.status(400).json({
        status: 400,
        message: "Metodo PUT, el cuerpo de la solicitud está vacío",
      });
    } //  es para probar la funcion para que no de undefined 

  try {
    const id = parseInt(req.params.id);
    const { nombre, categoria, color, precio } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        message: "ID inválido",
      });
    }

    // Aquí se implementará la lógica de actualización en base de datos

    res.status(200).json({
      status: 200,
      message: `Producto con ID ${id} modificado (simulación)`,
      data: { nombre, categoria, color, precio },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error al actualizar el producto",
      error: error.message,
    });
  }
};


const deleteProduct = async (req, res) => {
  if (!req.body) {
      return res.status(400).json({
        status: 400,
        message: "Metodo DELETE, el cuerpo de la solicitud está vacío",
      });
    } //  es para probar la funcion para que no de undefined 
  
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        message: "ID inválido",
      });
    }

    // Aquí se implementará la lógica de eliminación en base de datos

    res.status(200).json({
      status: 200,
      message: `Producto con ID ${id} eliminado (simulación)`,
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
