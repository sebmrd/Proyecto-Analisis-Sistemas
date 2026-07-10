import { useState, useEffect } from 'react';
import { Package, Trash2, Plus, Minus } from 'lucide-react';
import { dbService } from '../services/dbService';

export default function VistaInventario() {
  const [inventario, setInventario] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ codigo: '', nombre: '', categoria: '', stock: 0, precio: 0 });

  useEffect(() => {
    const cargarInventario = async () => {
      const data = await dbService.getData('inventario_tienda');
      if (data) {
        const invArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setInventario(invArray);
      }
    };
    cargarInventario();
  }, []);

  const guardarProducto = async (e) => {
    e.preventDefault();
    try {
      const id = await dbService.createRecord('inventario_tienda', nuevoProducto);
      setInventario([...inventario, { id, ...nuevoProducto }]);
      setNuevoProducto({ codigo: '', nombre: '', categoria: '', stock: 0, precio: 0 });
    } catch {
      alert("Error al guardar en inventario.");
    }
  };

  const modificarStock = async (id, stockActual, delta) => {
    const nuevoStock = Number(stockActual) + delta;
    if (nuevoStock < 0) return;
    try {
      await dbService.updateRecord('inventario_tienda', id, { stock: nuevoStock });
      setInventario(inventario.map(inv => inv.id === id ? { ...inv, stock: nuevoStock } : inv));
    } catch {
      alert("Error al actualizar stock.");
    }
  };

  const eliminarProducto = async (id) => {
    if(!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      await dbService.deleteRecord('inventario_tienda', id);
      setInventario(inventario.filter(inv => inv.id !== id));
    } catch {
      alert("Error eliminando producto.");
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
      
      {/* Formulario de Ingreso */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><Package className="w-5 h-5 text-amber-500"/> Ingresar Mercadería</h3>
        <form onSubmit={guardarProducto} className="flex gap-4 items-end">
          <div className="flex-1"><label className="text-sm font-bold text-gray-600">Cód. Barras</label><input required type="text" value={nuevoProducto.codigo} onChange={e => setNuevoProducto({...nuevoProducto, codigo: e.target.value})} className="w-full p-2 border rounded-lg" /></div>
          <div className="flex-1"><label className="text-sm font-bold text-gray-600">Producto</label><input required type="text" value={nuevoProducto.nombre} onChange={e => setNuevoProducto({...nuevoProducto, nombre: e.target.value})} className="w-full p-2 border rounded-lg" /></div>
          <div className="flex-1"><label className="text-sm font-bold text-gray-600">Categoría</label><input required type="text" value={nuevoProducto.categoria} onChange={e => setNuevoProducto({...nuevoProducto, categoria: e.target.value})} className="w-full p-2 border rounded-lg" /></div>
          <div className="w-24"><label className="text-sm font-bold text-gray-600">Stock</label><input required type="number" value={nuevoProducto.stock} onChange={e => setNuevoProducto({...nuevoProducto, stock: e.target.value})} className="w-full p-2 border rounded-lg" /></div>
          <div className="w-32"><label className="text-sm font-bold text-gray-600">P. Venta ($)</label><input required type="number" step="0.01" value={nuevoProducto.precio} onChange={e => setNuevoProducto({...nuevoProducto, precio: e.target.value})} className="w-full p-2 border rounded-lg" /></div>
          <button type="submit" className="bg-slate-800 text-white px-6 py-2 rounded-lg font-bold h-[42px]">Guardar</button>
        </form>
      </div>

      {/* Tabla de Inventario */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600 border-b border-gray-200">
              <th className="p-4 font-bold">Cód. Barras</th>
              <th className="p-4 font-bold">Producto</th>
              <th className="p-4 font-bold">Categoría</th>
              <th className="p-4 font-bold text-center">Stock Físico</th>
              <th className="p-4 font-bold text-right">P. Venta</th>
              <th className="p-4 font-bold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inventario.map(inv => (
              <tr key={inv.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-mono text-sm text-gray-500">{inv.codigo}</td>
                <td className="p-4 font-bold text-gray-800">{inv.nombre}</td>
                <td className="p-4 text-sm text-gray-600">{inv.categoria}</td>
                <td className="p-4 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <button onClick={() => modificarStock(inv.id, inv.stock, -1)} className="p-1 bg-gray-200 rounded hover:bg-red-200"><Minus className="w-3 h-3"/></button>
                    <span className={`font-bold ${inv.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>{inv.stock} u.</span>
                    <button onClick={() => modificarStock(inv.id, inv.stock, 1)} className="p-1 bg-gray-200 rounded hover:bg-green-200"><Plus className="w-3 h-3"/></button>
                  </div>
                </td>
                <td className="p-4 text-right font-bold text-slate-700">${Number(inv.precio).toFixed(2)}</td>
                <td className="p-4 text-center">
                  <button onClick={() => eliminarProducto(inv.id)} className="text-red-400 hover:text-red-600"><Trash2 className="w-5 h-5 inline" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
