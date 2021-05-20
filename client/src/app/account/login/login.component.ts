import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //#region  17.190.2 Adding form -> login.component.html
  loginForm: FormGroup;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  
  onSubmit() {
    //17.191 Sending data to server -> nav-bar.component.ts
    this.accountService.login(this.loginForm.value).subscribe(() => {
      console.log("User is logged in");
    }, error => {
      console.log(error);
    });
  }
  //#endregion
}
