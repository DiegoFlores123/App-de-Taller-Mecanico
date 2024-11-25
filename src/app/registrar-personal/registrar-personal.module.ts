import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarPersonalPageRoutingModule } from './registrar-personal-routing.module';

import { RegistrarPersonalPage } from './registrar-personal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarPersonalPageRoutingModule
  ],
  declarations: [RegistrarPersonalPage]
})
export class RegistrarPersonalPageModule {}
