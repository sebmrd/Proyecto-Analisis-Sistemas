# Sistema POS "Tía Pan"

**Proyecto Final - Análisis y Diseño de Sistemas**  
**Estudiante:** Sebastian Aníbal Alvarado Muñoz  
**Correo Institucional:** salvaradom1@est.ups.edu.ec  
**Institución:** Universidad Politécnica Salesiana, Sede Cuenca  

---

## Descripción del Proyecto
El Sistema POS "Tía Pan" es una aplicación web transaccional diseñada para digitalizar y optimizar las operaciones de una panadería y tienda de abarrotes familiar[cite: 5]. El sistema nace de la aplicación de una estrategia MIN-MIN, orientada a reducir los errores manuales de cobro y evitar la pérdida de pedidos especiales, mitigando el riesgo de descuadres de caja en días de alta afluencia.

---

## Stack Tecnológico
La solución informática implementa una arquitectura moderna orientada a la nube:
* **Frontend:** React.js con Vite para un renderizado ultra rápido.
* **Estilos:** Tailwind CSS para un diseño responsivo y optimizado para pantallas táctiles (Cajas POS).
* **Backend / Base de Datos:** Firebase Realtime Database (BaaS) para sincronización de datos en tiempo real.

---

## Arquitectura y Estructura del Código
El proyecto fue refactorizado para mantener una separación de responsabilidades estricta, cumpliendo con estándares profesionales de desarrollo de software:

* `/src/components/`: Contiene las vistas modulares del sistema (`Login`, `Layout`, `VistaCaja`, `VistaInventario`, `VistaPedidos`, `VistaReportes`).
* `/src/models/`: Implementación del Modelo Orientado a Objetos basado en el Diagrama de Clases UML.
* `/src/services/`: Capa de abstracción para las operaciones CRUD (`dbService.js`) que interactúa directamente con Firebase.
* `/src/context/`: Gestión del estado global de la aplicación (`GlobalContext.jsx`) utilizando la API Context de React para evitar el prop-drilling.
* `/src/config/`: Inicialización y credenciales de la base de datos en la nube.

---

## Implementación del Modelo Orientado a Objetos (POO)
Cumpliendo rigurosamente con el modelado UML del negocio, el sistema implementa herencia y composición mediante clases en JavaScript:
1. **`Producto` (Clase Padre):** Define atributos base (`id`, `nombre`, `precio`).
2. **`Panaderia` y `AbarroteTienda` (Clases Hijas):** Heredan de `Producto` y extienden sus propiedades según su naturaleza (frescura, stock físico, códigos de barras).
3. **`Venta` (Composición):** Agrupa la transacción, instanciando el total, el cajero en turno y una colección de productos.

---

## Módulos Funcionales
El sistema soporta múltiples usuarios con distintos niveles de acceso[cite: 5] y se divide en 4 módulos principales:

1. **Autenticación (Login Multiusuario):** Acceso segurizado mediante PIN (Dueña/Admin: `1234` | Hijos/Cajeros: `0000`).
2. **Caja Rápida (POS):** Interfaz ágil para la venta de pan (botones rápidos) y abarrotes, con cálculo automático de totales y vuelto[cite: 5]. Registra las ventas directamente en Firebase.
3. **Gestión de Pedidos:** Módulo CRUD para agendar pedidos futuros (ej. pasteles, lotes grandes de pan), registrar abonos y modificar su estado (Pendiente/Entregado).
4. **Inventario de Tienda:** Control en tiempo real del stock de abarrotes. Permite ingresar mercadería, ajustar existencias y eliminar productos descatalogados.
5. **Cuadre de Caja (Reporte Z):** Lee las transacciones del día desde Firebase y las contrasta con el efectivo físico ingresado por el usuario, detectando faltantes o sobrantes de manera automática.

---

## Instalación y Ejecución Local

Para correr este proyecto en un entorno de desarrollo local, sigue estos pasos:

1. Clona el repositorio:
```bash
git clone [https://github.com/sebas-alvarado-ups/pos-tia-pan-vite-firebase.git](https://github.com/sebmrd/Proyecto-Analisis-Sistemas.git)

2. Navega al directorio del proyecto:

```Bash
cd tia-pan-pos
```
Instala las dependencias:

```Bash
npm install
```
Ejecuta el servidor de desarrollo:

``` Bash
npm run dev
```
Abre tu navegador en http://localhost:5173/.

---

## Respaldo de Base de Datos

En cumplimiento de la rúbrica del proyecto, este repositorio incluye el archivo database-backup.json en la carpeta raíz, el cual contiene la estructura en formato JSON del árbol de datos utilizado en Firebase Realtime Database
