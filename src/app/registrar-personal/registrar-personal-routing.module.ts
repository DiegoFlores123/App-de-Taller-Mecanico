import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarPersonalPage } from './registrar-personal.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarPersonalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarPersonalPageRoutingModule {}
