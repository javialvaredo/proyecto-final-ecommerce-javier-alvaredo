import { db } from '../data/data.js';

const usersCollection = db.collection('users'); // referencia a la colección


export async function getAllUsers() {
  const snapshot = await usersCollection.get(); // obtiene todos los documentos
  const users = [];
  snapshot.forEach(doc => {
    users.push({ id: doc.id, ...doc.data() });
  });
  return users;
}


export async function getUserById(id) {
  const userDoc = await usersCollection.doc(id).get();
  return userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;
}


export async function saveUser(user) {
  const docRef = await usersCollection.add(user);
  return { id: docRef.id, ...user };
}


export async function updateUser(id, updatedUser) {
  const userDocRef = usersCollection.doc(id);
  await userDocRef.set(updatedUser, { merge: true });
  return { id, ...updatedUser };
}


export async function deleteUser(id) {
  await usersCollection.doc(id).delete();
  return true;
}


// función para crear ID numérico incremental
export async function createUserWithNumericId(userData) {
  const snapshot = await usersCollection.get();

  const userIds = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    if (typeof data.userId === 'number') {
      userIds.push(data.userId);
    }
  });

  let newId = 1;
  if (userIds.length > 0) {
    newId = Math.max(...userIds) + 1;
  }

  const newUser = { userId: newId, ...userData };

  const docRef = usersCollection.doc(String(newId));
  await docRef.set(newUser);

  return { id: String(newId), userId: newId, ...userData };
}


// buscar usuario por email para función login
export async function getUserByEmail(email) {
  const snapshot = await usersCollection.where('email', '==', email).get();

  if (snapshot.empty) return null;

  // Devuelve el primer usuario encontrado con ese email
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
}
