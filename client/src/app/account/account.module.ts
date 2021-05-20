import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';


// 17.186.1 Adding account-routing.module -> app-routing.module.ts
// 17.190.1 Add sheared module -> login.component.ts
@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AccountRoutingModule, SharedModule
  ]
})
export class AccountModule { }
