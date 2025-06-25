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

const productsCollection = collection(db, 'products');

export async function getAllProducts() {
  const querySnapshot = await getDocs(productsCollection);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); //agregamos el id al objeto 
}

export async function getProductById(id) {
  const productRef = doc(productsCollection, id);
  const productSnap = await getDoc(productRef);
  return productSnap.exists() ? { id: productSnap.id, ...productSnap.data() } : null;
}

export async function saveProduct(product) {
  const docRef = await addDoc(productsCollection, product);
  return { id: docRef.id, ...product };
}

export async function updateProduct(id, updatedProduct) {
  const productRef = doc(productsCollection, id);
  await setDoc(productRef, updatedProduct, { merge: true });
  return { id, ...updatedProduct };
}

export async function deleteProduct(id) {
  await deleteDoc(doc(productsCollection, id));
  return true;
}

//funcion para crear ID numérico incremental

export async function createProductWithNumericId(productData) {
  const querySnapshot = await getDocs(productsCollection);
  const ids = querySnapshot.docs
    .map(doc => doc.data().productId)   // Cambié aquí para que lea productId
    .filter(id => typeof id === 'number');

  const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

  // Guardamos productId en vez de id
  const newProduct = { productId: nextId, ...productData };

  const productRef = doc(productsCollection, String(nextId));
  await setDoc(productRef, newProduct);

  // Retornamos el id del doc Firestore (string) y productId numérico separado
  return { id: String(nextId), productId: nextId, ...productData };
}
