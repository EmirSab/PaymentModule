import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SharedModule } from '../shared/shared.module';

//11.119 Install and add toastar npm install ngx-toastr -> angular.json ->error.interceptor.ts
// 12.125.1 Import breadcrumb module ->section-header.html
// 17.194.1 Add shared module into core -> nav-bar.component.html
@NgModule({
  declarations: [NavBarComponent, TestErrorComponent, NotFoundComponent, ServerErrorComponent, SectionHeaderComponent],
  imports: [
    CommonModule, RouterModule, BreadcrumbModule, SharedModule, ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  exports: [NavBarComponent, SectionHeaderComponent]
})
export class CoreModule { }
