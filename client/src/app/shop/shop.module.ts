import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';

// 9.97.1 Add shared module -> shop.component.html

@NgModule({
  declarations: [ShopComponent, ProductItemComponent],
  imports: [
    CommonModule, SharedModule
  ],
  exports: [ShopComponent]
})
export class ShopModule { }
