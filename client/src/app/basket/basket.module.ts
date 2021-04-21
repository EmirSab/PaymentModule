import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket-routing.module';

// 14.144.2 Import BasketRoutingModule -> nav-bar.html

@NgModule({
  declarations: [BasketComponent],
  imports: [
    CommonModule, BasketRoutingModule
  ]
})
export class BasketModule { }
