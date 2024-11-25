import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PersonalService, Personal } from '../services/personal.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {
  personal: Personal[] = [];

  constructor(
    private toastController: ToastController,
    private router: Router,
    private personalService: PersonalService // Inyectar el servicio
  ) {}

  ngOnInit() {
    this.personalService.personal$.subscribe((personalData) => {
      this.personal = personalData;
    });
  }

  asignarTareas(mecanico: Personal) {
    localStorage.setItem('selectedMecanico', JSON.stringify(mecanico));
    this.router.navigate(['/agregar-tarea']);
  }

  gestionarAsistencia(mecanico: Personal) {
    this.router.navigate(['/gestionar-asistencia']);
  }

  goToRegistrarPersonal() {
    this.router.navigate(['/registrar-personal']);
  }

  goToMenu() {
    this.router.navigate(['/menu']); // Asegúrate de tener una página de menú en tu ruta
  }

  editarPersonal(mecanico: Personal) {
    localStorage.setItem('selectedMecanico', JSON.stringify(mecanico));
    this.router.navigate(['/editar-personal']);
  }

  eliminarPersonal(mecanico: Personal) {
    this.personalService.deletePersonal(mecanico.id); // Usar el servicio para eliminar personal
    this.showToast(`Personal ${mecanico.nombre} eliminado con éxito`, 'success');
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
}
