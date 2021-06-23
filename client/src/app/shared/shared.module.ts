import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';

// 9.97 Add module for pagination -> shop.module.ts
//9.101.3 Eksportovati paging header ->shop.html
// 9.102 Add new component pager, addit to the shared module, turn paging html in shared component
// and export pager component ->
//12.132 CarouselModule -> home.module.ts
// 14.154.2 Export OrderTotalsComponent -> baske.module.ts
// 17.190 Add reactive module -> account.module.ts
// 17.194 Add BsDropDownModule in import and export -> core.module.ts
// 17.197 Create text-input component and export it -> text-input.ts
// 19.230 Installing cdk stepper (ng add @angular/cdk), create a stepper component, import and export cdk in shared ->
// 19.230.1 Export stepper component ->checkout.html
// 19.238.1 Export basket-summary.component and import RouterModule -> basket-summary.component.ts

@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, OrderTotalsComponent, TextInputComponent, StepperComponent, BasketSummaryComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(), CarouselModule.forRoot(), BsDropdownModule.forRoot(), ReactiveFormsModule, 
    CdkStepperModule,
    RouterModule
  ],
  exports: [
    PaginationModule, 
    PagingHeaderComponent, 
    PagerComponent, 
    CarouselModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule,  
    TextInputComponent,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent
]
})
export class SharedModule { }
