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

const productsCollection = collection(db, 'products'); // obtiene la referencia al objeto parapoder operar


export async function getAllProducts() { 
  const querySnapshot = await getDocs(productsCollection); //obtiene todos los documentos de firestore
  const products = []; //array para guardar los productos que se obtienen
  querySnapshot.forEach((doc) => { 
    products.push({ id: doc.id, ...doc.data() }); 
  }); 
  return products; 
};


export async function getProductById(id) {
  const productRef = doc(productsCollection, id);
  const productSnap = await getDoc(productRef);
  return productSnap.exists() ? { id: productSnap.id, ...productSnap.data() } : null; // retorna json con id
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
export async function createProductWithNumericId(productData) { // recibe los datos ya validados en el servicio
  const snapshot = await getDocs(productsCollection);  // Traer todos los documentos de Firestore

  // Crear una lista de los productId existentes, solo los que son números
  const productIds = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    if (typeof data.productId === 'number') {
      productIds.push(data.productId);
    }
  });

  // Buscar el próximo número disponible para usar como productId
  let newId = 1;
  if (productIds.length > 0) {
    const maxId = Math.max(...productIds);
    newId = maxId + 1;
  }
  
  const newProduct = { productId: newId, ...productData }; // Crear el nuevo producto con el nuevo productId

  const docRef = doc(productsCollection, String(newId));   // Crear la referencia al documento con el ID en formato texto
  
  await setDoc(docRef, newProduct); // Guardar el registro en Firestore

  return { id: String(newId), productId: newId, ...productData };   // retornar el nuevo producto con id y productId
}
