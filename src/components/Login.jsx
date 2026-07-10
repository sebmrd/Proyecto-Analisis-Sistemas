import { UserCircle2, Lock } from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

export default function Login() {
  const { setUsuarioActivo } = useGlobal();

  const handleLogin = (e) => {
    e.preventDefault();
    const pin = e.target.pin.value;
    
    if (pin === '1234') {
      setUsuarioActivo({ nombre: 'Dueña (Admin)', rol: 'Administrador' });
    } else if (pin === '0000') {
      setUsuarioActivo({ nombre: 'Hijo (Cajero)', rol: 'Cajero' });
    } else {
      alert('PIN Incorrecto. Intente de nuevo.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 text-center">
        <h1 className="text-4xl font-black text-amber-500 mb-2">Tía Pan</h1>
        <p className="text-gray-500 mb-8 font-medium">Sistema POS - Acceso Seguro</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="relative">
            <UserCircle2 className="absolute left-3 top-3 text-gray-400 w-6 h-6" />
            <select className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-bold py-3 pl-12 pr-4 rounded-xl outline-none">
              <option value="admin">Dueña (Administradora)</option>
              <option value="caja">Hijos (Cajeros)</option>
            </select>
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 w-6 h-6" />
            <input 
              type="password" 
              name="pin" 
              placeholder="Ingrese su PIN" 
              required 
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-bold py-3 pl-12 pr-4 rounded-xl outline-none focus:ring-2 focus:ring-amber-500" 
            />
          </div>
          
          <button type="submit" className="mt-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-lg py-3 rounded-xl shadow-lg transition-transform active:scale-95">
            Ingresar al Sistema
          </button>
        </form>
        <p className="mt-6 text-xs text-gray-400">Dueña: 1234 | Cajero: 0000</p>
      </div>
    </div>
  );
}
