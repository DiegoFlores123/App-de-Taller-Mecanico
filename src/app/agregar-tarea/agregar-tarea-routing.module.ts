import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarTareaPage } from './agregar-tarea.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarTareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarTareaPageRoutingModule {}
