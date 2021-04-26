import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket-routing.module';
import { SharedModule } from '../shared/shared.module';

// 14.144.2 Import BasketRoutingModule -> nav-bar.html
// 14.154.3 Import shared.module -> basket.html
@NgModule({
  declarations: [BasketComponent],
  imports: [
    CommonModule, BasketRoutingModule, SharedModule
  ]
})
export class BasketModule { }
