import { createContext, useState, useContext } from 'react';

// Creamos el contexto
const GlobalContext = createContext();

// Hook personalizado para usar el contexto fácilmente
// eslint-disable-next-line react-refresh/only-export-components
export const useGlobal = () => useContext(GlobalContext);

// El "Proveedor" que envolverá nuestra aplicación
export const GlobalProvider = ({ children }) => {
  // ESTADOS GLOBALES[cite: 1, 2]
  const [usuarioActivo, setUsuarioActivo] = useState(null); 
  const [vistaActiva, setVistaActiva] = useState('caja');
  
  // ESTADOS DE CAJA[cite: 1, 2]
  const [carrito, setCarrito] = useState([]);
  const [pagoEfectivo, setPagoEfectivo] = useState('');
  
  // LÓGICA DE NEGOCIO GLOBAL[cite: 1, 2]
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const modificarCantidad = (id, delta) => {
    setCarrito(prev => prev.map(item => {
      if (item.id === id) {
        const nuevaCantidad = item.cantidad + delta;
        return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : item;
      }
      return item;
    }));
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  return (
    <GlobalContext.Provider value={{
      // Exportamos las variables y funciones para que toda la app las use
      usuarioActivo, setUsuarioActivo,
      vistaActiva, setVistaActiva,
      carrito, setCarrito,
      pagoEfectivo, setPagoEfectivo,
      agregarAlCarrito, modificarCantidad, eliminarDelCarrito
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
