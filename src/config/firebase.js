// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Reemplaza esto con el objeto de configuración que te da Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDX8s4DAYurdTXNIrJ9RvvhCo_uPOd8m1I",
  authDomain: "tia-pan.firebaseapp.com",
  databaseURL: "https://tia-pan-default-rtdb.firebaseio.com",
  projectId: "tia-pan",
  storageBucket: "tia-pan.firebasestorage.app",
  messagingSenderId: "201645074351",
  appId: "1:201645074351:web:88b7b6ee5dbbe5bef5315a"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar y exportar la Base de Datos en Tiempo Real
export const db = getDatabase(app);
