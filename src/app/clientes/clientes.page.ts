import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  clientes: any[] = [];

  constructor(
    private router: Router,
    private storage: Storage,
    private alertController: AlertController,
    private toastController: ToastController // Agregar el ToastController
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.clientes = await this.loadClientes();
  }

  async loadClientes() {
    return (await this.storage.get('clientes')) || [];
  }

  async addCliente() {
    this.router.navigate(['/cliente-detalle'], { queryParams: { isEditing: false } });
  }

  async editCliente(cliente: any) {
    this.router.navigate(['/cliente-detalle'], {
      queryParams: { isEditing: true, clienteId: cliente.id },
    });
  }

  async viewHistorial(cliente: any) {
    this.router.navigate(['/historial'], {
      queryParams: { clienteId: cliente.id },
    });
  }

  async confirmDelete(cliente: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteCliente(cliente);
          },
        },
      ],
    });

    await alert.present();
  }

  // Función para eliminar el cliente
  async deleteCliente(cliente: any) {
    const clientes = (await this.storage.get('clientes')) || [];
    const updatedClientes = clientes.filter((c: any) => c.id !== cliente.id);
    await this.storage.set('clientes', updatedClientes);
    this.clientes = updatedClientes; // Actualiza la lista de clientes
    this.showToast('Cliente eliminado correctamente.', 'danger');
  }

  // Cambiar el Alert a Toast para mostrar el mensaje con duración
  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000, // Duración en milisegundos
      color,
    });
    toast.present();
  }

  async ionViewWillEnter() {
    this.clientes = await this.loadClientes();
  }

  goToMenu() {
    this.router.navigate(['/menu']); // Asegúrate de tener esta ruta definida en tu routing module
  }
}
