import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialInventarioPageRoutingModule } from './historial-inventario-routing.module';

import { HistorialInventarioPage } from './historial-inventario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialInventarioPageRoutingModule
  ],
  declarations: [HistorialInventarioPage]
})
export class HistorialInventarioPageModule {}
