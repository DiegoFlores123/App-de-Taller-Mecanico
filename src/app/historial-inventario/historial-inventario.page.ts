import { Component, OnInit } from '@angular/core';
import { HistorialService, Historial } from 'src/app/services/historial.service';

@Component({
  selector: 'app-historial-inventario',
  templateUrl: './historial-inventario.page.html',
  styleUrls: ['./historial-inventario.page.scss'],
})
export class HistorialInventarioPage implements OnInit {
  historial: Historial[] = [];

  constructor(private historialService: HistorialService) {}

  ngOnInit() {
    this.historial = this.historialService.obtenerHistorial();
  }
}
