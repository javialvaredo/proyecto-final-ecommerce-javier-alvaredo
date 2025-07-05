import { db } from '../data/data.js';

const productsCollection = db.collection('products'); // referencia a la colección


export async function getAllProducts() {
  const snapshot = await productsCollection.get();
  const products = [];
  snapshot.forEach(doc => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
}


export async function getProductById(id) {
  const productDoc = await productsCollection.doc(id).get();
  return productDoc.exists ? { id: productDoc.id, ...productDoc.data() } : null;
}


export async function getProductsByFilter(filters) {
  let query = productsCollection;

  // Iteramos sobre cada filtro y armamos la query con where
  for (const [field, value] of Object.entries(filters)) {
    query = query.where(field, '==', value);
  }

  const snapshot = await query.get();
  const products = [];
  snapshot.forEach(doc => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
}



export async function saveProduct(product) {
  const docRef = await productsCollection.add(product);
  return { id: docRef.id, ...product };
}


export async function updateProduct(id, updatedProduct) {
  const productDocRef = productsCollection.doc(id);
  await productDocRef.set(updatedProduct, { merge: true });
  return { id, ...updatedProduct };
}


export async function deleteProduct(id) {
  await productsCollection.doc(id).delete();
  return true;
}


// función para crear ID numérico incremental
export async function createProductWithNumericId(productData) {
  const snapshot = await productsCollection.get();

  const productIds = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    if (typeof data.productId === 'number') {
      productIds.push(data.productId);
    }
  });

  let newId = 1;
  if (productIds.length > 0) {
    newId = Math.max(...productIds) + 1;
  }

  const newProduct = { productId: newId, ...productData };

  const docRef = productsCollection.doc(String(newId));
  await docRef.set(newProduct);

  return { id: String(newId), productId: newId, ...productData };
}
