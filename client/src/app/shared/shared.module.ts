import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';

// 9.97 Add module for pagination -> shop.module.ts
//9.101.3 Eksportovati paging header ->shop.html
// 9.102 Add new component pager, addit to the shared module, turn paging html in shared component
// and export pager component ->

@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  exports: [PaginationModule, PagingHeaderComponent, PagerComponent]
})
export class SharedModule { }
