import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionarAsistenciaPage } from './gestionar-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: GestionarAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionarAsistenciaPageRoutingModule {}
