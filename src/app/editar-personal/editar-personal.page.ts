import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalService } from '../services/personal.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-editar-personal',
  templateUrl: './editar-personal.page.html',
  styleUrls: ['./editar-personal.page.scss'],
})
export class EditarPersonalPage implements OnInit {
  mecanico: any;

  constructor(
    private router: Router,
    private personalService: PersonalService // Inyectamos el servicio
  ) {}

  ngOnInit() {
    // Recuperamos el mecánico desde localStorage
    this.mecanico = JSON.parse(localStorage.getItem('selectedMecanico') || '{}');
  }

  guardarCambios() {
    // Verificamos si el mecanico tiene los valores actualizados
    console.log('Guardando cambios:', this.mecanico);

    // Llamamos al método de actualización del servicio para reflejar los cambios
    this.personalService.updatePersonal(this.mecanico);

    // Redirigimos a la página de personal
    this.router.navigate(['/personal']);
  }

  goBack() {
    this.router.navigate(['/personal']); // Volver a la lista de personal
  }
}
