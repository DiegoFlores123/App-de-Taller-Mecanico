import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventarioFormPageRoutingModule } from './inventario-form-routing.module';

import { InventarioFormPage } from './inventario-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventarioFormPageRoutingModule
  ],
  declarations: [InventarioFormPage]
})
export class InventarioFormPageModule {}
