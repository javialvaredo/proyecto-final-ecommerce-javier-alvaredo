// en desarrollo cuando se migre a base de datos implementara el await
import products from "../models/products.model.js";

const getAllProducts = async (req, res) => {
  try {
    let resultados = products; // array en memoria

    res.status(200).json({
    status: 200,
    count: resultados.length, // muestra la cantidad de registros
    data: resultados //el array de productos
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
    if (!req.body) {
      return res.status(400).json({
        status: 400,
        message: "El cuerpo de la solicitud está vacío",
      });
    }

    const { nombre, categoria, color, precio } = req.body;

    if (!nombre || !categoria || !color || !precio) {
      return res.status(400).json({
        status: 400,
        message: "Todos los campos son obligatorios",
      });
    }

      // Revisar si hay productos en el array
    let nuevoId = 1; // Si no hay productos, el ID será 1

    if (products.length > 0) {
      // Buscar el ID más alto de los productos existentes
      let maxId = 0;
      for (let i = 0; i < products.length; i++) {
        if (products[i].id > maxId) {
          maxId = products[i].id;
        }
      }
      // El nuevo ID será uno más que el mayor encontrado
      nuevoId = maxId + 1;
    }
    
    const nuevoProducto = {
      id: nuevoId,
      nombre,
      categoria,
      color,
      precio: Number(precio),
    };

    products.push(nuevoProducto); // Agregar al array en memoria

    res.status(201).json({
      status: 201,
      message: "Producto creado",
      data: nuevoProducto,
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
    const id = parseInt(req.params.id);

    const producto = products.find(p => p.id === id);

    if (!producto) {
      return res.status(404).json({
        status: 404,
        message: "Producto no encontrado",
      });
    }

    const { nombre, categoria, color, precio } = req.body;

    if (!nombre || !categoria || !color || !precio) {
      return res.status(400).json({
        status: 400,
        message: "Todos los campos son obligatorios",
      });
    }

    // Modificar los registros
    producto.nombre = nombre;
    producto.categoria = categoria;
    producto.color = color;
    producto.precio = Number(precio);

    res.status(200).json({
      status: 200,
      message: "Producto modificado con éxito",
      data: producto,
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
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({
        status: 404,
        message: "Producto no encontrado",
      });
    }

    // Eliminar el producto del array
    const eliminado = products.splice(index, 1)[0];

    res.status(200).json({
      status: 200,
      message: "Producto eliminado",
      data: eliminado,
    });

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error al eliminar el producto",
      error: error.message,
    });
  }
};




const deleteProduct_ = async (req, res) => {
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
