import { ShoppingCart, CalendarDays, Package, BarChart3, LogOut } from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

export default function Layout({ children }) {
  const { usuarioActivo, setUsuarioActivo, vistaActiva, setVistaActiva } = useGlobal();

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR NAVEGACIÓN */}
        <aside className="w-20 lg:w-64 bg-slate-800 text-white flex flex-col z-10 shadow-2xl">
          <div className="h-16 flex items-center justify-center border-b border-slate-700">
            <h1 className="hidden lg:block text-2xl font-bold text-amber-400">Tía Pan</h1>
            <Package className="lg:hidden w-8 h-8 text-amber-400" />
          </div>
          
          <nav className="flex-1 py-4 flex flex-col gap-2">
            <button onClick={() => setVistaActiva('caja')} className={`flex items-center gap-4 px-6 py-3 ${vistaActiva === 'caja' ? 'bg-slate-700 text-amber-400 border-r-4 border-amber-400' : 'hover:bg-slate-700 text-slate-300'}`}>
              <ShoppingCart className="w-6 h-6" /><span className="hidden lg:block font-medium">Caja Rápida</span>
            </button>
            <button onClick={() => setVistaActiva('pedidos')} className={`flex items-center gap-4 px-6 py-3 ${vistaActiva === 'pedidos' ? 'bg-slate-700 text-amber-400 border-r-4 border-amber-400' : 'hover:bg-slate-700 text-slate-300'}`}>
              <CalendarDays className="w-6 h-6" /><span className="hidden lg:block font-medium">Pedidos</span>
            </button>
            <button onClick={() => setVistaActiva('inventario')} className={`flex items-center gap-4 px-6 py-3 ${vistaActiva === 'inventario' ? 'bg-slate-700 text-amber-400 border-r-4 border-amber-400' : 'hover:bg-slate-700 text-slate-300'}`}>
              <Package className="w-6 h-6" /><span className="hidden lg:block font-medium">Inventario</span>
            </button>
            <button onClick={() => setVistaActiva('reportes')} className={`flex items-center gap-4 px-6 py-3 ${vistaActiva === 'reportes' ? 'bg-slate-700 text-amber-400 border-r-4 border-amber-400' : 'hover:bg-slate-700 text-slate-300'}`}>
              <BarChart3 className="w-6 h-6" /><span className="hidden lg:block font-medium">Reportes</span>
            </button>
          </nav>
          
          <div className="p-4 border-t border-slate-700">
            <button onClick={() => setUsuarioActivo(null)} className="flex items-center justify-center gap-2 w-full py-2 bg-red-600/80 hover:bg-red-600 rounded-lg text-white font-bold">
              <LogOut className="w-5 h-5" /><span className="hidden lg:block">Cerrar Sesión</span>
            </button>
          </div>
        </aside>

        {/* ÁREA CENTRAL */}
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-0">
            <h2 className="text-xl font-black text-gray-800 capitalize">
              {vistaActiva === 'caja' ? 'Punto de Venta' : vistaActiva}
            </h2>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <div className="text-sm text-gray-600 font-bold">
                Usuario Activo: <span className="text-amber-600">{usuarioActivo.nombre}</span>
              </div>
            </div>
          </header>
          
          {/* AQUÍ SE RENDERIZARÁN LAS VISTAS DINÁMICAS */}
          {children}
        </main>
      </div>
      
      {/* FOOTER EXIGIDO POR RÚBRICA */}
      <footer className="h-8 bg-slate-900 text-slate-400 text-xs flex items-center justify-center border-t border-slate-800 z-20">
        Proyecto Final - Análisis y Diseño de Sistemas - Universidad Politécnica Salesiana © 2026
      </footer>
    </div>
  );
}
