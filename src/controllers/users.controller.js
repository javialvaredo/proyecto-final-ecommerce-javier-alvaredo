// en desarrollo

import users from "../models/users.model.js";

const getAllUsers = (req, res) => {
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
};

const getUserById = (req, res) => {
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
};

const createUser = (req, res) => {
  res.send("Usuario creado");
};

export {
  getAllUsers,
  getUserById,
  createUser
};
