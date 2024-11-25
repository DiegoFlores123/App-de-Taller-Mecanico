import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.page.html',
  styleUrls: ['./cliente-detalle.page.scss'],
})
export class ClienteDetallePage implements OnInit {
  isEditing: boolean = false;
  cliente: any = {
    id: null,
    nombre: '',
    contacto: '',
    vehiculos: [],
  };
  vehiculo: any = {
    marca: '',
    modelo: '',
    anio: '',
    imagen: '', // Almacenará la imagen como base64
    servicios: {}, // Servicios seleccionados
  };
  serviciosDisponibles: string[] = ['Mantenimiento', 'Reparación', 'Inspección', 'Lavado'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.storage.create();

    this.route.queryParams.subscribe(async (params) => {
      this.isEditing = params['isEditing'] === 'true';

      if (this.isEditing) {
        const clienteId = params['clienteId'];
        const clientes = (await this.storage.get('clientes')) || [];
        this.cliente = clientes.find((c: any) => c.id === parseInt(clienteId, 10)) || this.cliente;
      }
    });
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }

  async saveCliente() {
    if (!this.cliente.nombre || !this.cliente.contacto) {
      this.showToast('Por favor, completa todos los campos obligatorios.', 'danger');
      return;
    }

    const clientes = (await this.storage.get('clientes')) || [];

    if (this.isEditing) {
      const index = clientes.findIndex((c: any) => c.id === this.cliente.id);
      if (index > -1) {
        clientes[index] = this.cliente;
      }
    } else {
      this.cliente.id = new Date().getTime();
      clientes.push(this.cliente);
    }

    await this.storage.set('clientes', clientes);
    this.showToast('¡Cliente guardado con éxito!', 'success');
    this.router.navigate(['/clientes']);
  }

  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.vehiculo.imagen = reader.result as string; // Convertimos la imagen a base64
      };
      reader.readAsDataURL(file);
    }
  }

  addVehiculo() {
    if (this.vehiculo.marca && this.vehiculo.modelo && this.vehiculo.anio) {
      const serviciosSeleccionados = Object.keys(this.vehiculo.servicios).filter(
        (servicio) => this.vehiculo.servicios[servicio]
      );
      if (serviciosSeleccionados.length === 0) {
        this.showToast('Por favor, selecciona al menos un servicio para el vehículo.', 'danger');
        return;
      }

      const nuevoVehiculo = {
        ...this.vehiculo,
        servicios: serviciosSeleccionados,
      };

      this.cliente.vehiculos.push(nuevoVehiculo);
      this.vehiculo = { marca: '', modelo: '', anio: '', imagen: '', servicios: {} };
      this.showToast('¡Vehículo agregado con éxito!', 'success');
    } else {
      this.showToast('Por favor, completa todos los campos del vehículo.', 'danger');
    }
  }

  removeVehiculo(index: number) {
    this.cliente.vehiculos.splice(index, 1);
    this.showToast('Vehículo eliminado correctamente.', 'warning');
  }

  editVehiculo(index: number) {
    const vehiculo = this.cliente.vehiculos[index];
    this.vehiculo = { ...vehiculo, servicios: this.convertArrayToServicios(vehiculo.servicios) };
    this.removeVehiculo(index); // Eliminar temporalmente el vehículo de la lista
  }
  
  convertArrayToServicios(serviciosArray: string[]): Record<string, boolean> {
    const servicios: Record<string, boolean> = {};
    this.serviciosDisponibles.forEach((servicio) => {
      servicios[servicio] = serviciosArray.includes(servicio);
    });
    return servicios;
  }
  
}
