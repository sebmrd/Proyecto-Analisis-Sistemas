import { useGlobal } from './context/GlobalContext';
import Login from './components/Login';
import Layout from './components/Layout';
import VistaCaja from './components/VistaCaja';
import VistaPedidos from './components/VistaPedidos';
import VistaInventario from './components/VistaInventario';
import VistaReportes from './components/VistaReportes';

export default function App() {
  const { usuarioActivo, vistaActiva } = useGlobal();

  if (!usuarioActivo) {
    return <Login />;
  }

  return (
    <Layout>
      {vistaActiva === 'caja' && <VistaCaja />}
      {vistaActiva === 'pedidos' && <VistaPedidos />}
      {vistaActiva === 'inventario' && <VistaInventario />}
      {vistaActiva === 'reportes' && <VistaReportes />}
    </Layout>
  );
}
