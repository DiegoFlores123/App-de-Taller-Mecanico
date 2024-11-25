import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPersonalPageRoutingModule } from './editar-personal-routing.module';

import { EditarPersonalPage } from './editar-personal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPersonalPageRoutingModule
  ],
  declarations: [EditarPersonalPage]
})
export class EditarPersonalPageModule {}
