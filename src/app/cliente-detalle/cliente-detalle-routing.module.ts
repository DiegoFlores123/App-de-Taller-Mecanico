import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteDetallePage } from './cliente-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteDetallePageRoutingModule {}
