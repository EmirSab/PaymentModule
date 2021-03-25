import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';

// 9.97 Add module for pagination -> shop.module.ts

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  exports: [PaginationModule]
})
export class SharedModule { }
