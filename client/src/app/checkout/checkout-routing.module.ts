import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';

// 14.158 Add checkout component and its modules and add routes -> checkout.module.ts
const routes: Routes = [
  {path: '', component: CheckoutComponent},
  //19.248.3 Add route for success page ->
  {path: 'success', component: CheckoutSuccessComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ], exports: [RouterModule]
})
export class CheckoutRoutingModule { }
