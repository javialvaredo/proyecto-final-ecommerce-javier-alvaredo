import * as UserModel from "../models/users.model.js";
import bcrypt from 'bcrypt';

export async function getAllUsers() {
  const users = await UserModel.getAllUsers();
  return users;
};
  

export async function getUserById(id) {
  if (!id) throw new Error('ID es requerido');
  const user = await UserModel.getUserById(id);
  return user;
};

export async function createUser(data) {
  const required = ['nombre', 'apellido', 'edad', 'email', 'password'];
  for (const field of required) {
    if (!data[field]) throw new Error(`Campo requerido: ${field}`); 
  }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = {
      nombre: data.nombre,
      apellido: data.apellido,
      edad: Number(data.edad),
      email: data.email,
      password: hashedPassword,
  };

  const user = await UserModel.createUserWithNumericId(newUser);
  return user;
};

export async function updateUser(id, data) {
  if (!id) throw new Error('ID es requerido');

  const fieldsToUpdate = {};

  if (data.nombre) fieldsToUpdate.nombre = data.nombre;
  if (data.apellido) fieldsToUpdate.apellido = data.apellido;
  if (data.edad) fieldsToUpdate.edad = Number(data.edad);
  if (data.email) fieldsToUpdate.email = data.email;

  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    fieldsToUpdate.password = hashedPassword;
  }

  if (Object.keys(fieldsToUpdate).length === 0) {
    throw new Error('No se proporcionaron campos para actualizar');
  }

  const user = await UserModel.updateUser(id, fieldsToUpdate);
  return user;
}


export async function deleteUser(id) {
  if (!id) throw new Error('ID es requerido');
    const product = await UserModel.deleteUser(id);
    return product;
};

