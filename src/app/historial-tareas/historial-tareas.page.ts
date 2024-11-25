import { Component, OnInit } from '@angular/core';

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
  selector: 'app-historial-tareas',
  templateUrl: './historial-tareas.page.html',
  styleUrls: ['./historial-tareas.page.scss'],
})
export class HistorialTareasPage implements OnInit {
  selectedMecanico: Mecanico | undefined;
  historialTareas: { accion: string; descripcion: string; fecha: Date }[] = [];

  constructor() {}

  ngOnInit() {
    const storedMecanico = localStorage.getItem('selectedMecanico');
    if (storedMecanico) {
      this.selectedMecanico = JSON.parse(storedMecanico);

      if (this.selectedMecanico?.historialTareas) {
        this.historialTareas = this.selectedMecanico.historialTareas;
      }
    }
  }
}
