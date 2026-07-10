import { useState } from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';
import { dbService } from '../services/dbService';
import { Venta, Panaderia } from '../models/clases';

const PRODUCTOS_RAPIDOS = [
  new Panaderia(1, 'Pan x6 (Agua/Dulce)', 1.00, 'bg-amber-100 border-amber-300', true),
  new Panaderia(2, 'Pan de Leche', 0.25, 'bg-orange-100 border-orange-300', true),
  new Panaderia(3, 'Café Pasado', 1.00, 'bg-stone-200 border-stone-400', true),
  new Panaderia(4, 'Postre (Porción)', 1.50, 'bg-pink-100 border-pink-300', true),
  new Panaderia(5, 'Pastel (Pequeño)', 8.00, 'bg-rose-100 border-rose-300', true),
  new Panaderia(6, 'Cola (1 Litro)', 1.25, 'bg-blue-100 border-blue-300', false)
];

export default function VistaCaja() {
  const { usuarioActivo, carrito, setCarrito, pagoEfectivo, setPagoEfectivo, agregarAlCarrito, modificarCantidad, eliminarDelCarrito } = useGlobal();
  const [cargando, setCargando] = useState(false);

  const totalCarrito = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const vuelto = parseFloat(pagoEfectivo) - totalCarrito;

  const procesarVenta = async () => {
    if (totalCarrito === 0) return alert("El carrito está vacío");
    if (parseFloat(pagoEfectivo) < totalCarrito || !pagoEfectivo) return alert("Monto insuficiente");

    setCargando(true);
    try {
      const nuevaVenta = new Venta(usuarioActivo.nombre, totalCarrito, carrito);
      await dbService.createRecord('ventas', nuevaVenta);
      alert(`¡Venta registrada en Firebase!\nTotal: $${totalCarrito.toFixed(2)}\nVuelto: $${vuelto.toFixed(2)}`);
      setCarrito([]);
      setPagoEfectivo('');
    } catch {
      alert("Error al guardar la venta en la nube.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      <section className="w-2/3 p-6 overflow-y-auto">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Botones Rápidos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PRODUCTOS_RAPIDOS.map((prod) => (
            <button key={prod.id} onClick={() => agregarAlCarrito(prod)} className={`${prod.color} border-2 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:shadow-lg active:scale-95`}>
              <span className="font-bold text-gray-800 text-center leading-tight">{prod.nombre}</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm font-black text-gray-900">${prod.precio.toFixed(2)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="w-1/3 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 bg-gray-50 border-b border-gray-200"><h3 className="font-bold text-gray-800 text-center text-lg">Ticket Virtual</h3></div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {carrito.length === 0 ? <div className="text-center text-gray-400 mt-10">Sin productos</div> : 
            carrito.map((item) => (
              <div key={item.id} className="flex flex-col border border-gray-100 rounded-lg p-3 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-800">{item.nombre}</span>
                  <span className="font-bold text-amber-600">${(item.precio * item.cantidad).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                    <button onClick={() => modificarCantidad(item.id, -1)} className="p-1 bg-white rounded shadow-sm"><Minus className="w-4 h-4" /></button>
                    <span className="font-bold text-gray-800 w-4 text-center">{item.cantidad}</span>
                    <button onClick={() => modificarCantidad(item.id, 1)} className="p-1 bg-white rounded shadow-sm"><Plus className="w-4 h-4" /></button>
                  </div>
                  <button onClick={() => eliminarDelCarrito(item.id)} className="text-red-400 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
                </div>
              </div>
            ))
          }
        </div>
        <div className="bg-slate-800 text-white p-6 rounded-tl-3xl">
          <div className="flex justify-between items-end mb-4">
            <span className="text-slate-300 text-lg">Total a Pagar:</span>
            <span className="text-4xl font-black text-amber-400">${totalCarrito.toFixed(2)}</span>
          </div>
          <div className="mb-4">
            <label className="block text-slate-400 text-sm mb-1">Efectivo Recibido:</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500 font-bold text-lg">$</span>
              <input type="number" value={pagoEfectivo} onChange={(e) => setPagoEfectivo(e.target.value)} placeholder="0.00" className="w-full bg-white text-gray-900 text-2xl font-bold py-2 pl-8 pr-4 rounded-lg outline-none" />
            </div>
          </div>
          <div className="flex justify-between items-center mb-6 py-2 border-t border-slate-600">
            <span className="text-slate-300">Vuelto:</span>
            <span className={`text-2xl font-bold ${vuelto >= 0 ? 'text-green-400' : 'text-red-400'}`}>${pagoEfectivo ? vuelto.toFixed(2) : '0.00'}</span>
          </div>
          <button onClick={procesarVenta} disabled={cargando} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-xl py-4 rounded-xl shadow-lg">
            {cargando ? 'Guardando...' : 'Cobrar Ticket'}
          </button>
        </div>
      </section>
    </div>
  );
}
