import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPersonalPage } from './editar-personal.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPersonalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPersonalPageRoutingModule {}
