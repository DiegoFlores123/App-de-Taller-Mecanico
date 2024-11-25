import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionarAsistenciaPageRoutingModule } from './gestionar-asistencia-routing.module';

import { GestionarAsistenciaPage } from './gestionar-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionarAsistenciaPageRoutingModule
  ],
  declarations: [GestionarAsistenciaPage]
})
export class GestionarAsistenciaPageModule {}
