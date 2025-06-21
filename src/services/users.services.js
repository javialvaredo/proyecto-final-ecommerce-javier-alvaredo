import users from "../models/users.model.js"

const getAllUsers = async () => {
  return users;
};
  

const getUserById = async (id) => {
  return users.find(user => user.id == id);
};

const createUser = async (userData) => {
  
    const newUser = {
      id: users.length +1,
      nombre: userData.nombre,
      apellido: userData.apellido,
      edad: Number(userData.edad),
      email: userData.email,
    }

    users.push(newUser); // Agregar al array en memoria
    return newUser;
};

const updateUser = async (id, updatedData) => {
    const index = users.findIndex(u => u.id == id)
    if (index === -1) {
    return null; // Usuario no encontrado
  }
    const user = users[index];
     
    if (updatedData.nombre) { 
        user.nombre = updatedData.nombre;
    }
    if (updatedData.apellido) {
        user.apellido = updatedData.apellido;
    }
    if (updatedData.edad) {
        user.edad = Number(updatedData.edad);
    }
    if (updatedData.email) {
        user.email = updatedData.email;
    }
    return user;
};

const deleteUser = async (id) => {
  const index = users.findIndex(u => u.id == id);
  if (index === -1) return false;
  users.splice(index, 1); // eliminamos el usuario
  return true;
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};