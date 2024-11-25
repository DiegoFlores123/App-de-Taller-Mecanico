import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialTareasPage } from './historial-tareas.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialTareasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialTareasPageRoutingModule {}
