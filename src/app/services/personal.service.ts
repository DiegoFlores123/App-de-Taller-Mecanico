import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Personal {
  id: number;
  nombre: string;
  especialidad: string;
  horario: string;
  tareas: string[];
  tiempoTrabajado: number;
  asistencia: boolean;
  productividad: number;
  asistencias: number;
  ausencias: number;
}

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  private personalSource = new BehaviorSubject<Personal[]>([]);
  personal$ = this.personalSource.asObservable();

  constructor() {
    this.loadPersonal();
  }

  loadPersonal() {
    const storedPersonal = localStorage.getItem('personal');
    const personal = storedPersonal ? JSON.parse(storedPersonal) : [];
    this.personalSource.next(personal);
  }

  addPersonal(mecanico: Personal) {
    const personal = this.personalSource.value;
    mecanico.id = personal.length + 1; // Asignar ID automático
    personal.push(mecanico);
    this.updateLocalStorage(personal);
  }

  deletePersonal(id: number) {
    const personal = this.personalSource.value.filter(p => p.id !== id);
    this.updateLocalStorage(personal);
  }

  // Método para actualizar un personal
  updatePersonal(updatedMecanico: Personal) {
    const personal = this.personalSource.value.map(mecanico =>
      mecanico.id === updatedMecanico.id ? updatedMecanico : mecanico
    );
    this.updateLocalStorage(personal);
  }

  private updateLocalStorage(personal: Personal[]) {
    localStorage.setItem('personal', JSON.stringify(personal));
    this.personalSource.next(personal); // Emitir los cambios
  }
}
