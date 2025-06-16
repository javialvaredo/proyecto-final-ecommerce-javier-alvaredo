// en desarrollo cuando se migre a base de datos implementara el await

import users from "../models/users.model.js";

const getAllUsers = async (req, res) => {
  try {
    const { nombre, apellido, edad, email } = req.query;

  let resultados = users;

  if (nombre) {
    resultados = resultados.filter(p =>
      p.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  }

  if (apellido) {
    resultados = resultados.filter(p =>
      p.apellido.toLowerCase() === apellido.toLowerCase()
    );
  }

  if (edad) {
    const edadNum = Number(edad);
    if (!isNaN(edad)) {
      resultados = resultados.filter(p => p.edad <= edadNum);
    };
  }

  if (email) {
    resultados = resultados.filter(p =>
      p.email.toLowerCase() === email.toLowerCase()
    );
    }
  
  res.json({
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

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
  const userId = users.find(user => user.id === id);

  if (!userId) {
    return res.status(404).json({
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
        message: "Metodo POST, el cuerpo de la solicitud está vacío",
      });
    } //  es para probar la funcion para que no de undefined 
    const { nombre, apellido, edad, email } = req.body;

    if (!nombre || !apellido || !edad || !email) {
      return res.status(400).json({
        status: 400,
        message: "Todos los campos son obligatorios",
      });
    }
        // Aquí se implementará la lógica real más adelante
    res.status(201).json({
      status: 201,
      message: "Usuario creado",
      data: {
        nombre,
        apellido,
        edad: Number(edad),
        email,
      },
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
  if (!req.body) {
      return res.status(400).json({
        status: 400,
        message: "Metodo PUT, el cuerpo de la solicitud está vacío",
      });
    } //  es para probar la funcion para que no de undefined 

  try {
    const id = parseInt(req.params.id);
    const { nombre, apellido, edad, email } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        message: "ID inválido",
      });
    }

    // Aquí se implementará la lógica de actualización en base de datos

    res.status(200).json({
      status: 200,
      message: `Usuario con ID ${id} modificado (simulación)`,
      data: { nombre, apellido, edad, email },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error al actualizar usuario",
      error: error.message,
    });
  }
  
};

const deleteUser = async (req, res) => {
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
      message: `Usuario con ID ${id} eliminado (simulación)`,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error al eliminar usuario",
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
