import { ref, set, get, push, update, remove, child } from "firebase/database";
import { db } from "../config/firebase";

export const dbService = {
  // Obtener datos de una ruta (ej: 'inventario')
  async getData(path) {
    const dbRef = ref(db);
    try {
      const snapshot = await get(child(dbRef, path));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error obteniendo datos:", error);
      throw error;
    }
  },

  // Crear un nuevo registro con ID autogenerado (Ideal para Pedidos o Ventas)
  async createRecord(path, data) {
    try {
      const listRef = ref(db, path);
      const newRef = push(listRef);
      await set(newRef, data);
      return newRef.key;
    } catch (error) {
      console.error("Error creando registro:", error);
      throw error;
    }
  },

  // Actualizar un registro específico (Ideal para actualizar stock del inventario)
  async updateRecord(path, id, data) {
    try {
      const recordRef = ref(db, `${path}/${id}`);
      await update(recordRef, data);
      return true;
    } catch (error) {
      console.error("Error actualizando registro:", error);
      throw error;
    }
  },

  async deleteRecord(path, id) {
    try {
      const recordRef = ref(db, `${path}/${id}`);
      await remove(recordRef);
      return true;
    } catch (error) {
      console.error("Error eliminando registro:", error);
      throw error;
    }
  }
};
