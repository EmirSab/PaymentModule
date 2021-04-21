import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { BasketModule } from './basket.module';
import { BasketComponent } from './basket.component';

// 14.144.1 Setting up routes -> basket.module.ts
const routes: Routes = [
  {path: '', component: BasketComponent}
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BasketRoutingModule { }
