import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';

// 9.97 Add module for pagination -> shop.module.ts
//9.101.3 Eksportovati paging header ->shop.html

@NgModule({
  declarations: [PagingHeaderComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  exports: [PaginationModule, PagingHeaderComponent]
})
export class SharedModule { }
