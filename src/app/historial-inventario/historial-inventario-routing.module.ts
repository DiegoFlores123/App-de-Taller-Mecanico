import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialInventarioPage } from './historial-inventario.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialInventarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialInventarioPageRoutingModule {}
