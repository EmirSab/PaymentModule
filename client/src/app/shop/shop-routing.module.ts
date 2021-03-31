import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

// 10.113.1 Create routes for shop module -> shop.module.ts
const routes: Routes = [
  {path: '', component: ShopComponent},
  {path: ':id', component: ProductDetailsComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
