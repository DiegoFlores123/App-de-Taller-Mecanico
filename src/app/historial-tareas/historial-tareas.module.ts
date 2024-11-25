import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialTareasPageRoutingModule } from './historial-tareas-routing.module';

import { HistorialTareasPage } from './historial-tareas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialTareasPageRoutingModule
  ],
  declarations: [HistorialTareasPage]
})
export class HistorialTareasPageModule {}
