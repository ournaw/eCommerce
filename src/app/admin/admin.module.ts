import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AllCartsComponent } from './components/all-carts/all-carts.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AllCartsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
