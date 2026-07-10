import { useState, useEffect } from 'react';
import { Printer, CheckCircle } from 'lucide-react'; // Mantenemos la importación
import { dbService } from '../services/dbService';

export default function VistaReportes() {
  const [totalVentasDia, setTotalVentasDia] = useState(0);
  const [efectivoFisico, setEfectivoFisico] = useState('');
  const [estadoCuadre, setEstadoCuadre] = useState(null);

  useEffect(() => {
    const calcularVentasHoy = async () => {
      const data = await dbService.getData('ventas');
      if (data) {
        const hoy = new Date().toLocaleDateString();
        const ventasArray = Object.values(data);
        const ventasHoy = ventasArray.filter(venta => venta.fecha.includes(hoy));
        const sumaTotal = ventasHoy.reduce((acc, venta) => acc + Number(venta.total), 0);
        setTotalVentasDia(sumaTotal);
      }
    };
    calcularVentasHoy();
  }, []);

  const verificarCuadre = () => {
    const fisico = Number(efectivoFisico);
    if (fisico === totalVentasDia) {
      setEstadoCuadre('ok');
    } else if (fisico < totalVentasDia) {
      setEstadoCuadre('faltante');
    } else {
      setEstadoCuadre('sobrante');
    }
  };

  // Función opcional por si quieres que el icono realmente imprima la pantalla
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 items-center">
      
      <div className="bg-white rounded-xl shadow-sm border p-8 flex flex-col items-center justify-center w-full max-w-2xl mt-10">
        
        {/* MODIFICACIÓN: Añadimos flex y el componente Printer aquí */}
        <div className="text-center mb-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black text-slate-800">Cuadre de Caja Diario</h2>
            <button 
              onClick={handlePrint} 
              className="p-2 text-slate-500 hover:text-amber-500 hover:bg-slate-100 rounded-lg transition-colors"
              title="Imprimir reporte"
            >
              <Printer className="w-7 h-7" />
            </button>
          </div>
          <p className="text-gray-500 mt-2">Verifique el dinero físico de la caja registradora contra el sistema.</p>
        </div>

        <div className="flex justify-between w-full bg-slate-50 p-6 rounded-lg mb-6 border border-slate-200">
          <span className="text-xl font-bold text-slate-700">Total Vendido Hoy (Sistema):</span>
          <span className="text-2xl font-black text-amber-500">${totalVentasDia.toFixed(2)}</span>
        </div>

        <div className="w-full mb-8">
          <label className="block text-slate-700 font-bold mb-2">Ingresa el Efectivo Físico Contado:</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-500 font-bold text-lg">$</span>
            <input 
              type="number" 
              step="0.01"
              value={efectivoFisico} 
              onChange={(e) => {
                setEfectivoFisico(e.target.value);
                setEstadoCuadre(null);
              }}
              placeholder="0.00" 
              className="w-full bg-white border-2 border-gray-300 text-gray-900 text-2xl font-bold py-2 pl-8 pr-4 rounded-lg outline-none focus:border-amber-500" 
            />
          </div>
        </div>

        <button 
          onClick={verificarCuadre}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-transform active:scale-95 mb-6"
        >
          Confirmar Cuadre
        </button>

        {estadoCuadre === 'ok' && (
          <div className="w-full bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            <span className="font-bold">¡Caja Cuadrada Perfectamente!</span>
          </div>
        )}
        
        {estadoCuadre === 'faltante' && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
            <span className="font-bold">¡Alerta! Faltan ${(totalVentasDia - Number(efectivoFisico)).toFixed(2)} en la caja.</span>
          </div>
        )}

        {estadoCuadre === 'sobrante' && (
          <div className="w-full bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative text-center">
            <span className="font-bold">Sobran ${(Number(efectivoFisico) - totalVentasDia).toFixed(2)} en la caja.</span>
          </div>
        )}

      </div>
    </div>
  );
}
