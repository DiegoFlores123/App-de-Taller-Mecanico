import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

export interface Mecanico {
  id: number;
  nombre: string;
  especialidad: string;
  horario: string;
  tareas: { descripcion: string, completada: boolean }[]; // Tareas con descripción y estado de completada
  tiempoTrabajado: number;
  asistencia: boolean;
  productividad: number;
  asistencias: number;
  ausencias: number;
}

@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.page.html',
  styleUrls: ['./agregar-tarea.page.scss'],
})
export class AgregarTareaPage implements OnInit {
  selectedMecanico: Mecanico | undefined; 
  taskDescription: string = ''; 
  tareas: { descripcion: string, completada: boolean }[] = [];

  constructor(private router: Router, private toastController: ToastController) {}

  ngOnInit() {
    // Obtener el mecánico seleccionado desde localStorage
    const storedMecanico = localStorage.getItem('selectedMecanico');
    if (storedMecanico) {
      this.selectedMecanico = JSON.parse(storedMecanico);

      // Verificar si 'selectedMecanico' no es undefined antes de asignar tareas
      if (this.selectedMecanico) {
        this.tareas = this.selectedMecanico.tareas || [];
      }
    }
  }

  async asignarTarea() {
    if (this.selectedMecanico && this.taskDescription) {
      // Crear la tarea con la descripción y estado 'no completada'
      const nuevaTarea = { descripcion: this.taskDescription, completada: false };

      // Asignar tarea al mecánico
      this.selectedMecanico.tareas.push(nuevaTarea);
      this.taskDescription = ''; // Limpiar campo de tarea

      // Actualizar el mecánico en el localStorage
      this.actualizarMecanicoEnLocalStorage();

      // Actualizar la lista de tareas
      this.tareas = [...this.selectedMecanico.tareas];

      // Mostrar mensaje de éxito con ShowToast
      this.showToast('Tarea asignada con éxito');
    } else {
      this.showToast('Por favor selecciona un mecánico y agrega una tarea');
    }
  }

// Función para marcar una tarea como completada
async marcarCompletada(index: number) {
  if (this.selectedMecanico) {
    // Marcar la tarea como completada
    this.selectedMecanico.tareas[index].completada = true;

    // Actualizamos las tareas en localStorage
    this.actualizarTareas();

    // Actualizamos la lista de tareas para reflejar los cambios en la vista
    this.tareas = [...this.selectedMecanico.tareas];

    // Mostrar mensaje de éxito
    this.showToast('Tarea marcada como completada');
  }
}

  async eliminarTarea(index: number) {
    if (this.selectedMecanico) {
      this.selectedMecanico.tareas.splice(index, 1); 
      this.actualizarMecanicoEnLocalStorage();
      this.tareas = [...this.selectedMecanico.tareas];
    }
  }

  async actualizarMecanicoEnLocalStorage() {
    if (this.selectedMecanico) {  // Verificamos si selectedMecanico está definido
      const personal: Mecanico[] = JSON.parse(localStorage.getItem('personal') || '[]');
      
      // Verificamos si el mecánico existe dentro de la lista
      const index = personal.findIndex((m: Mecanico) => m.id === this.selectedMecanico?.id);
      
      if (index !== -1) {
        personal[index] = this.selectedMecanico; // Actualizamos el mecánico con las tareas modificadas
        localStorage.setItem('personal', JSON.stringify(personal)); // Guardamos en localStorage
      }
      
      // Guardamos el mecánico seleccionado con las tareas actualizadas
      localStorage.setItem('selectedMecanico', JSON.stringify(this.selectedMecanico));
    } else {
      console.error('selectedMecanico es undefined');
    }
  }
  
  async actualizarTareas() {
    if (this.selectedMecanico) {  // Verificamos si selectedMecanico está definido
      const personal: Mecanico[] = JSON.parse(localStorage.getItem('personal') || '[]');
  
      // Buscamos el mecánico seleccionado dentro de la lista de personal
      const index = personal.findIndex((m: Mecanico) => m.id === this.selectedMecanico?.id);
      
      if (index !== -1) {
        personal[index] = this.selectedMecanico; // Actualizamos el mecánico con las tareas modificadas
        localStorage.setItem('personal', JSON.stringify(personal)); // Guardamos en localStorage
      }
  
      // También guardamos el mecánico seleccionado con las tareas actualizadas
      localStorage.setItem('selectedMecanico', JSON.stringify(this.selectedMecanico));
    } else {
      console.error('selectedMecanico es undefined');
    }
  }
  

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  volverAPersonal() {
    this.router.navigate(['/personal']);
  }
}
