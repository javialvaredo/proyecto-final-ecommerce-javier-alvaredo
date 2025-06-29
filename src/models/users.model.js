import { db } from '../data/data.js';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  setDoc
} from 'firebase/firestore';

const usersCollection = collection(db, 'users'); // obtiene la referencia al objeto parapoder operar


export async function getAllUsers() { 
  const querySnapshot = await getDocs(usersCollection); //obtiene todos los documentos de firestore
  const users = []; //array para guardar los usarios que se obtienen
  querySnapshot.forEach((doc) => { 
    users.push({ id: doc.id, ...doc.data() }); 
  }); 
  return users; 
};


export async function getUserById(id) {
  const userRef = doc(usersCollection, id);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? { id: userSnap.id, ...userSnap.data() } : null; // retorna json con id
}

export async function saveUser(user) {
  const docRef = await addDoc(usersCollection, user);
  return { id: docRef.id, ...user };
}

export async function updateUser(id, updatedUser) {
  const userRef = doc(usersCollection, id);
  await setDoc(userRef, updatedUser , { merge: true });
  return { id, ...updatedUser };
}

export async function deleteUser(id) {
  await deleteDoc(doc(usersCollection, id));
  return true;
}

//funcion para crear ID numérico incremental
export async function createUserWithNumericId(userData) {
  const snapshot = await getDocs(usersCollection);  // Traer todos los usuarios de Firestore

  // Crear una lista de los user Id existentes, solo los que son números
  const userIds = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    if (typeof data.userId === 'number') {
      userIds.push(data.userId);
    }
  });

  // Buscar el próximo número disponible para usar como userId
  let newId = 1;
  if (userIds.length > 0) {
    const maxId = Math.max(...userIds);
    newId = maxId + 1;
  }
  
  const newUser = { userId: newId, ...userData }; // Crear el nuevo usuario con el nuevo userId

  const docRef = doc(usersCollection, String(newId));   // Crear la referencia al documento con el ID en formato texto
  
  await setDoc(docRef, newUser); // Guardar el registro en Firestore

  return { id: String(newId), userId: newId, ...userData };   // retornar el nuevo usuario con id y userId
}

// buscar usuario por email para funcion login
export async function getUserByEmail(email) {
  const querySnapshot = await getDocs(usersCollection);
  let foundUser = null;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.email === email) {
      foundUser = { id: doc.id, ...data };
    }
  });

  return foundUser;
}

