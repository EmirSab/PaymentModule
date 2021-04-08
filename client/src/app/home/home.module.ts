import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';



// 10.108.1 Export home component -> app.module.ts
// 12.132.1 Add shared module -> home.html
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule, SharedModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
