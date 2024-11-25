import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HistorialService } from './historial.service';

export interface Producto {
  id?: number;
  nombre: string;
  stock: number;
}

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private productosKey = 'productos';
  private productosSubject = new BehaviorSubject<Producto[]>(this.cargarProductosDeStorage());
  productos$ = this.productosSubject.asObservable();

  constructor(private historialService: HistorialService) {}

  cargarProductosDeStorage(): Producto[] {
    const productos = localStorage.getItem(this.productosKey);
    return productos ? JSON.parse(productos) : [];
  }

  guardarProducto(producto: Producto): void {
    const productos = this.cargarProductosDeStorage();
    if (producto.id) {
      // Editar producto existente
      const index = productos.findIndex((p) => p.id === producto.id);
      if (index !== -1) {
        productos[index] = producto;
        this.historialService.agregarHistorial(`Producto "${producto.nombre}" editado`);
      }
    } else {
      // Agregar nuevo producto
      producto.id = Date.now();
      productos.push(producto);
      this.historialService.agregarHistorial(`Producto "${producto.nombre}" agregado`);
    }

    localStorage.setItem(this.productosKey, JSON.stringify(productos));
    this.productosSubject.next(productos);
  }

  eliminarProducto(id: number): void {
    let productos = this.cargarProductosDeStorage();
    const productoEliminado = productos.find((p) => p.id === id);
    productos = productos.filter((producto) => producto.id !== id);
    localStorage.setItem(this.productosKey, JSON.stringify(productos));

    if (productoEliminado) {
      this.historialService.agregarHistorial(`Producto "${productoEliminado.nombre}" eliminado`);
    }

    this.productosSubject.next(productos);
  }
}
