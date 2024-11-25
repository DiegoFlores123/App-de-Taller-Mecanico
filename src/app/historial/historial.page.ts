import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  cliente: any = {
    id: null,
    nombre: '',
    contacto: '',
    vehiculos: [], // Vehículos con sus imágenes en formato Base64
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();

    this.route.queryParams.subscribe(async (params) => {
      const clienteId = params['clienteId'];
      const clientes = (await this.storage.get('clientes')) || [];
      this.cliente = clientes.find((c: any) => c.id === parseInt(clienteId, 10)) || this.cliente;
    });
  }

  goBack() {
    this.router.navigate(['/clientes']);
  }
}
