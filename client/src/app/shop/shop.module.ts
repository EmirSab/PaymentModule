import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopRoutingModule } from './shop-routing.module';

// 9.97.1 Add shared module -> shop.component.html
// 10.113.2 Import shop-routing.module

@NgModule({
  declarations: [ShopComponent, ProductItemComponent, ProductDetailsComponent],
  imports: [
    CommonModule, SharedModule, ShopRoutingModule
  ]
})
export class ShopModule { }
