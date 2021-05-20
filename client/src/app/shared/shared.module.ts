import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { ReactiveFormsModule } from '@angular/forms';

// 9.97 Add module for pagination -> shop.module.ts
//9.101.3 Eksportovati paging header ->shop.html
// 9.102 Add new component pager, addit to the shared module, turn paging html in shared component
// and export pager component ->
//12.132 CarouselModule -> home.module.ts
// 14.154.2 Export OrderTotalsComponent -> baske.module.ts
// 17.190 Add reactive module -> account.module.ts

@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, OrderTotalsComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(), CarouselModule.forRoot(), ReactiveFormsModule
  ],
  exports: [PaginationModule, PagingHeaderComponent, PagerComponent, CarouselModule,
  OrderTotalsComponent, ReactiveFormsModule]
})
export class SharedModule { }
