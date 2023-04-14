import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCartsComponent } from './components/all-carts/all-carts.component';

const routes: Routes = [
  { path: '', component: AllCartsComponent },
  { path: 'carts', component: AllCartsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
