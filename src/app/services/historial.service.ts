import { Injectable } from '@angular/core';

export interface Historial {
  id: number;
  descripcion: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  private historialKey = 'historial';

  constructor() {}

  // Agregar un nuevo cambio al historial
  agregarHistorial(descripcion: string): void {
    const historial: Historial[] = this.obtenerHistorial();
    const nuevoHistorial: Historial = {
      id: Date.now(),
      descripcion,
      fecha: new Date().toLocaleString(),
    };
    historial.push(nuevoHistorial);
    localStorage.setItem(this.historialKey, JSON.stringify(historial));
  }

  // Obtener el historial almacenado en el localStorage
  obtenerHistorial(): Historial[] {
    const historial = localStorage.getItem(this.historialKey);
    return historial ? JSON.parse(historial) : [];
  }
}
