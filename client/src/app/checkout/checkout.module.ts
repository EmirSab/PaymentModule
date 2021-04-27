import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';


//14.158.1 Add routing to module -> app.routing.module
@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule, CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
