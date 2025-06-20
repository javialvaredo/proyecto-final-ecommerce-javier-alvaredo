// en desarrollo cuando se migre a base de datos implementara el await

import users from "../models/users.model.js";

const getAllUsers = async (req, res) => {
  try {
    let resultados = users;
    
    res.status(200).json({
      status: 200,
      count: resultados.length,
      data: resultados
    });
    
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error al obtener usuarios",
      error: error.message
    });
  }
};
  

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = users.find(user => user.id === id);

  if (!userId) {
    return res.status(404).json({ //return envia mensaje y detiene la ejecucion
      status: 404,
      message: "Usuario no encontrado",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Usuario encontrado",
    data: userId,
  });
    
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error al obtener el usuario",
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        status: 400,
        message: "El cuerpo de la solicitud está vacío",
      });
    }
    const { nombre, apellido, edad, email } = req.body;

    if (!nombre || !apellido || !edad || !email) {
      return res.status(400).json({
        status: 400,
        message: "Todos los campos son obligatorios",
      });
    }
    // Revisar si hay usuarios en el array
    let nuevoId = 1; // Si no hay usuarios, el ID será 1
    if (users.length > 0) {
      // Buscar el ID más alto de los productos existentes
      let maxId = 0;
      for (let i = 0; i < users.length; i++) {
        if (users[i].id > maxId) {
          maxId = users[i].id;
        }
      }
      // El nuevo ID será uno más que el mayor encontrado
      nuevoId = maxId + 1;
    }

    const nuevoUsuario = {
      id: nuevoId,
      nombre,
      apellido,
      edad: Number(edad),
      email,
    }

    users.push(nuevoUsuario); // Agregar al array en memoria

    res.status(201).json({
      status:201,
      message: "Usuario creado",
      data: nuevoUsuario
    });
    
    
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error al crear usuario",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
      return res.status(404).json({
        status:404,
        message: "Usuario no encontrado",
      });
    }
    const { nombre, apellido, edad, email } = req.body;

    if (!nombre || !apellido || !edad || !email) {
      return res.status(400).json({
        status: 400,
        message: "Todos los campos son obligatorios",
      });
    }
    // Modificar los registros
    user.nombre = nombre;
    user.apellido = apellido;
    user.edad = edad;
    user.email = email;

    res.status(200).json({
      status: 200,
      message: "Usuario modificado con éxito",
      data: user,
    })

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error al modifia el usuario",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
      return res.status(404).json({
        status: 404,
        message: "Usuario no encontrado",
      });
    }
     // Eliminar el usuario del array
    const eliminado = users.splice(index, 1)[0];

    res.status(200).json({
      status: 200,
      message: "Usuario eliminado",
      data: eliminado,
    });

  } catch (error) {
     res.status(500).json({
      status: 500,
      message: "Error al eliminar el usuario",
      error: error.message,
    });
  }
};


export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
