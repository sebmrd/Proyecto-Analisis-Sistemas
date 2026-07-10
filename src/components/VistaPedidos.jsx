import { useState, useEffect } from 'react';
import { CheckCircle, Trash2 } from 'lucide-react';
import { dbService } from '../services/dbService';

export default function VistaPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [nuevoPedido, setNuevoPedido] = useState({ cliente: '', detalle: '', fecha: '', abono: '', total: '' });

  useEffect(() => {
    const cargarPedidos = async () => {
      const data = await dbService.getData('pedidos');
      if (data) {
        const pedidosArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setPedidos(pedidosArray);
      }
    };
    cargarPedidos();
  }, []);

  const guardarPedido = async (e) => {
    e.preventDefault();
    const pedidoConEstado = { ...nuevoPedido, estado: 'Pendiente' };
    try {
      const id = await dbService.createRecord('pedidos', pedidoConEstado);
      setPedidos([...pedidos, { id, ...pedidoConEstado }]);
      setNuevoPedido({ cliente: '', detalle: '', fecha: '', abono: '', total: '' });
    } catch {
      alert("Error al guardar el pedido.");
    }
  };

  const cambiarEstado = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === 'Pendiente' ? 'Entregado' : 'Pendiente';
    try {
      await dbService.updateRecord('pedidos', id, { estado: nuevoEstado });
      setPedidos(pedidos.map(ped => ped.id === id ? { ...ped, estado: nuevoEstado } : ped));
    } catch {
      alert("Error al actualizar estado.");
    }
  };

  const eliminarPedido = async (id) => {
    if(!window.confirm("¿Estás seguro de eliminar este pedido?")) return;
    try {
      await dbService.deleteRecord('pedidos', id);
      setPedidos(pedidos.filter(ped => ped.id !== id));
    } catch {
      alert("Error al eliminar.");
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto flex gap-6">
      <div className="w-1/3 bg-white p-6 rounded-xl shadow-sm border h-fit">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Nuevo Pedido</h3>
        <form onSubmit={guardarPedido} className="flex flex-col gap-4">
          <div><label className="text-sm font-bold text-gray-600">Cliente</label><input required type="text" value={nuevoPedido.cliente} onChange={e => setNuevoPedido({...nuevoPedido, cliente: e.target.value})} className="w-full p-2 border rounded-lg bg-gray-50" /></div>
          <div><label className="text-sm font-bold text-gray-600">Detalle</label><textarea required value={nuevoPedido.detalle} onChange={e => setNuevoPedido({...nuevoPedido, detalle: e.target.value})} className="w-full p-2 border rounded-lg bg-gray-50 h-24" /></div>
          <div><label className="text-sm font-bold text-gray-600">Fecha de Entrega</label><input required type="date" value={nuevoPedido.fecha} onChange={e => setNuevoPedido({...nuevoPedido, fecha: e.target.value})} className="w-full p-2 border rounded-lg bg-gray-50" /></div>
          <div className="flex gap-4">
            <div className="w-1/2"><label className="text-sm font-bold text-gray-600">Total ($)</label><input required type="number" value={nuevoPedido.total} onChange={e => setNuevoPedido({...nuevoPedido, total: e.target.value})} className="w-full p-2 border rounded-lg bg-gray-50" /></div>
            <div className="w-1/2"><label className="text-sm font-bold text-gray-600">Abono ($)</label><input type="number" value={nuevoPedido.abono} onChange={e => setNuevoPedido({...nuevoPedido, abono: e.target.value})} className="w-full p-2 border rounded-lg bg-gray-50" /></div>
          </div>
          <button type="submit" className="mt-4 bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-700">Agendar Pedido</button>
        </form>
      </div>

      <div className="w-2/3 bg-white p-6 rounded-xl shadow-sm border h-fit">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Pedidos Agendados</h3>
        <div className="flex flex-col gap-3">
          {pedidos.length === 0 ? <p className="text-gray-500">No hay pedidos registrados.</p> : 
            pedidos.map(ped => (
              <div key={ped.id} className="p-4 border border-gray-100 bg-gray-50 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-800 text-lg">{ped.cliente}</p>
                  <p className="text-sm text-gray-600">{ped.detalle}</p>
                  <div className="flex gap-4 mt-2 text-xs font-bold text-gray-500">
                    <span>Entrega: {ped.fecha}</span>
                    <span className="text-amber-600">Abono: ${ped.abono} / Total: ${ped.total}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${ped.estado === 'Pendiente' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{ped.estado}</span>
                  <button onClick={() => cambiarEstado(ped.id, ped.estado)} className="p-2 bg-white rounded-full shadow hover:text-green-600" title="Cambiar Estado">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button onClick={() => eliminarPedido(ped.id)} className="p-2 bg-white rounded-full shadow hover:text-red-600" title="Eliminar">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
