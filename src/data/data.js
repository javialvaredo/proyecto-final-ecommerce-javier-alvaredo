import 'dotenv/config';
import admin from 'firebase-admin';

// Parsear la variable de entorno FIREBASE_SERVICE_ACCOUNT (de tipo JSON)
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Inicializar Firebase Admin (solo si no fue inicializado)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

// Instancia de Firestore
const db = admin.firestore();

export { db };
