import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestionar-asistencia',
  templateUrl: './gestionar-asistencia.page.html',
  styleUrls: ['./gestionar-asistencia.page.scss'],
})
export class GestionarAsistenciaPage implements OnInit {
  mecanico: any;
  asistenciaCount: number = 0;
  ausenciaCount: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    // Recuperamos el mecánico desde localStorage
    this.mecanico = JSON.parse(localStorage.getItem('selectedMecanico') || '{}');

    // Si el mecánico no tiene contadores guardados, inicializamos en 0
    this.asistenciaCount = this.mecanico.asistencias || 0;
    this.ausenciaCount = this.mecanico.ausencias || 0;
  }

  incrementAsistencia() {
    this.asistenciaCount++;
    this.mecanico.asistencias = this.asistenciaCount;
    localStorage.setItem('selectedMecanico', JSON.stringify(this.mecanico));
  }

  incrementAusencia() {
    this.ausenciaCount++;
    this.mecanico.ausencias = this.ausenciaCount;
    localStorage.setItem('selectedMecanico', JSON.stringify(this.mecanico));
  }

  goBack() {
    this.router.navigate(['/personal']); // Volver a la lista de personal
  }
}
