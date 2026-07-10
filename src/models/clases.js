export class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
}

export class Panaderia extends Producto { // Herencia
  constructor(id, nombre, precio, color, esFresco) {
    super(id, nombre, precio);
    this.color = color;
    this.esFresco = esFresco;
  }
}

export class AbarroteTienda extends Producto { // Herencia[cite: 3]
  constructor(id, nombre, precio, codigo, categoria, stock) {
    super(id, nombre, precio);
    this.codigo = codigo;
    this.categoria = categoria;
    this.stock = stock;
  }
}

export class Venta {
  constructor(cajero, total, carrito) {
    this.id = Date.now();
    this.fecha = new Date().toLocaleString();
    this.cajero = cajero;
    this.total = total;
    this.detalles = carrito; // Composición (Una venta CONTIENE detalles)[cite: 3]
  }
}
