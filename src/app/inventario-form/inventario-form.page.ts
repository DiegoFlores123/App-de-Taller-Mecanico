import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InventarioService, Producto } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-inventario-form',
  templateUrl: './inventario-form.page.html',
  styleUrls: ['./inventario-form.page.scss'],
})
export class InventarioFormPage implements OnInit {
  producto: Producto = { nombre: '', stock: 0 }; // Producto vacío por defecto

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,  // Importado correctamente
    private inventarioService: InventarioService
  ) {}

  ngOnInit() {
    // Si la ruta tiene un estado (producto que se pasa al editar)
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['producto']) {  // Acceso con corchetes
      this.producto = navigation.extras.state['producto'];  // Acceso con corchetes
    }
  }

  guardarProducto() {
    // Llamamos al servicio para guardar el producto (ya sea nuevo o editado)
    this.inventarioService.guardarProducto(this.producto);

    // Redirigimos al inventario después de guardar
    this.router.navigate(['/inventario']);
  }
}
