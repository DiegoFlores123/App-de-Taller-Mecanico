import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PersonalService, Personal } from '../services/personal.service'; // Importar el servicio

@Component({
  selector: 'app-registrar-personal',
  templateUrl: './registrar-personal.page.html',
  styleUrls: ['./registrar-personal.page.scss'],
})
export class RegistrarPersonalPage implements OnInit {
  nuevoMecanico: Personal = {
    id: 0,
    nombre: '',
    especialidad: '',
    horario: '',
    tareas: [],
    tiempoTrabajado: 0,
    asistencia: false,
    productividad: 0,
    asistencias: 0,
    ausencias: 0,
  };

  constructor(
    private toastController: ToastController,
    private router: Router,
    private personalService: PersonalService // Inyectar el servicio
  ) {}

  ngOnInit() {}

  registrarMecanico() {
    this.personalService.addPersonal(this.nuevoMecanico); // Usar el servicio para agregar el nuevo personal
    this.showToast('Mecánico registrado con éxito', 'success');
    this.router.navigate(['/personal']);
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
