import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

export interface Mecanico {
  id: number;
  nombre: string;
  especialidad: string;
  horario: string;
  tareas: { descripcion: string; completada: boolean }[];
  tiempoTrabajado: number;
  asistencia: boolean;
  productividad: number;
  asistencias: number;
  ausencias: number;
  historialTareas: { accion: string; descripcion: string; fecha: Date }[];
}

@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.page.html',
  styleUrls: ['./agregar-tarea.page.scss'],
})
export class AgregarTareaPage implements OnInit {
  selectedMecanico: Mecanico | undefined;
  taskDescription: string = '';
  tareas: { descripcion: string; completada: boolean }[] = [];

  constructor(private router: Router, private toastController: ToastController) {}

  ngOnInit() {
    // Obtener el mecánico seleccionado desde localStorage
    const storedMecanico = localStorage.getItem('selectedMecanico');
    if (storedMecanico) {
      this.selectedMecanico = JSON.parse(storedMecanico);

      if (this.selectedMecanico) {
        this.tareas = this.selectedMecanico.tareas || [];
      }
    }
  }

  async asignarTarea() {
    if (this.selectedMecanico && this.taskDescription) {
      const nuevaTarea = { descripcion: this.taskDescription, completada: false };

      this.selectedMecanico.tareas.push(nuevaTarea);
      this.taskDescription = '';

      // Registrar historial de la asignación
      this.registrarHistorial('Tarea asignada', nuevaTarea.descripcion);

      this.actualizarMecanicoEnLocalStorage();

      this.tareas = [...this.selectedMecanico.tareas];
      this.showToast('Tarea asignada con éxito');
    } else {
      this.showToast('Por favor selecciona un mecánico y agrega una tarea');
    }
  }

  async marcarCompletada(index: number) {
    if (this.selectedMecanico) {
      const tarea = this.selectedMecanico.tareas[index];
      tarea.completada = true;

      // Registrar historial de la tarea completada
      this.registrarHistorial('Tarea completada', tarea.descripcion);

      this.actualizarMecanicoEnLocalStorage();

      this.tareas = [...this.selectedMecanico.tareas];
      this.showToast('Tarea marcada como completada');
    }
  }

  async eliminarTarea(index: number) {
    if (this.selectedMecanico) {
      const tareaEliminada = this.selectedMecanico.tareas[index].descripcion;

      this.selectedMecanico.tareas.splice(index, 1);

      // Registrar historial de la eliminación
      this.registrarHistorial('Tarea eliminada', tareaEliminada);

      this.actualizarMecanicoEnLocalStorage();

      this.tareas = [...this.selectedMecanico.tareas];
    }
  }

  async registrarHistorial(accion: string, descripcion: string) {
    if (this.selectedMecanico) {
      const historialItem = {
        accion,
        descripcion,
        fecha: new Date(),
      };

      if (!this.selectedMecanico.historialTareas) {
        this.selectedMecanico.historialTareas = [];
      }

      this.selectedMecanico.historialTareas.push(historialItem);

      this.actualizarMecanicoEnLocalStorage();
    }
  }

  async actualizarMecanicoEnLocalStorage() {
    if (this.selectedMecanico) {
      const personal: Mecanico[] = JSON.parse(localStorage.getItem('personal') || '[]');
      const index = personal.findIndex((m) => m.id === this.selectedMecanico?.id);

      if (index !== -1) {
        personal[index] = this.selectedMecanico;
        localStorage.setItem('personal', JSON.stringify(personal));
      }

      localStorage.setItem('selectedMecanico', JSON.stringify(this.selectedMecanico));
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  volverAPersonal() {
    this.router.navigate(['/personal']);
  }

  irAHistorial() {
    this.router.navigate(['/historial-tareas']);
  }
  
}
