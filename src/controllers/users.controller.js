import * as usersService from "../services/users.services.js";

const getAllUsers = async (req, res) => {
  try {
    const resultados = await usersService.getAllUsers();

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
    const id = req.params.id;
    const userId = await usersService.getUserById(id);
    
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
    const { nombre, apellido, edad, email, password } = req.body;

    if (!nombre || !apellido || !edad || !email || !password) {
      return res.status(400).json({
        status: 400,
        message: "Todos los campos son obligatorios",
      });
    }
        
    const newUser = await usersService.createUser({
      nombre,
      apellido,
      edad,
      email,
      password,
    });

      res.status(201).json({
      status:201,
      message: "Usuario creado",
      data: newUser,
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
    const id = req.params.id; // 🔄 No usamos parseInt, Firestore usa string
    const { nombre, apellido, edad, email, password } = req.body;

    // Si no se envía ningún campo, lanzamos error
    if (!nombre && !apellido && !edad && !email && !password) {
      return res.status(400).json({
        status: 400,
        message: "Debe haber al menos un campo para actualizar",
      });
    }

    const updatedUser = await usersService.updateUser(id, {
      nombre,
      apellido,
      edad,
      email,
      password
    });

    if (!updatedUser) {
      return res.status(404).json({
        status: 404,
        message: "Usuario no encontrado"
      });
    }

    res.status(200).json({
      status: 200,
      message: "Usuario modificado con éxito",
      data: updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error al modificar el usuario",
      error: error.message,
    });
  }
};


const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await usersService.deleteUser(id);
        
    if (!deleted) {
      return res.status(404).json({
        status: 404,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Usuario eliminado",
      data: deleted,
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
