import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { InventarioService, Producto } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  productos: Producto[] = [];  // Lista de todos los productos
  productosFiltrados: Producto[] = [];  // Lista de productos filtrados
  searchText: string = '';  // Variable que almacena el texto de búsqueda

  constructor(
    private inventarioService: InventarioService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.inventarioService.productos$.subscribe((productos) => {
      this.productos = productos; // Actualizamos la lista de productos
      this.productosFiltrados = productos; // Inicializamos la lista filtrada con todos los productos
      this.alertarInventarioBajo(); // Verifica si algún producto tiene stock bajo
    });
  }

  nuevoProducto() {
    this.router.navigate(['/inventario-form']);
  }

  editarProducto(producto: Producto) {
    this.router.navigate(['/inventario-form'], { state: { producto } });
  }

  eliminarProducto(id: number | undefined) {
    if (id === undefined) {
      this.showToast('El ID del producto no es válido.', 'danger');
      return;
    }

    this.inventarioService.eliminarProducto(id);
    this.showToast('Producto eliminado correctamente.', 'success');
  }

  alertarInventarioBajo() {
    const bajos = this.productos.filter((p) => p.stock < 5);
    if (bajos.length > 0) {
      bajos.forEach((p) => {
        this.showToast(
          `Alerta: El producto "${p.nombre}" tiene un stock bajo (${p.stock}).`,
          'warning'
        );
      });
    }
  }

  // Filtrar productos por nombre
  filtrarProductos() {
    // Si no hay texto en el campo de búsqueda, mostramos todos los productos
    if (this.searchText.trim() === '') {
      this.productosFiltrados = this.productos;
    } else {
      // Filtramos los productos cuyo nombre contiene el texto de búsqueda (insensible a mayúsculas/minúsculas)
      this.productosFiltrados = this.productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(this.searchText.toLowerCase().trim())
      );
    }
  }

  async showToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
    });
    await toast.present();
  }

  goToMenu() {
    this.router.navigate(['/menu']); // Asegúrate de tener esta ruta definida en tu routing module
  }
}
