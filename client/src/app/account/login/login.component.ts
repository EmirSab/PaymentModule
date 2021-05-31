import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //#region  17.190.2 Adding form -> login.component.html
  loginForm: FormGroup;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = new FormGroup({
      // 17.195 Add mail validation -> login.component.html
      email: new FormControl('', [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required)
    });
  }
  
  onSubmit() {
    //17.191 Sending data to server -> nav-bar.component.ts
    this.accountService.login(this.loginForm.value).subscribe(() => {
      //17.194.4 Sending user to shop component after login -> nav-bar.component.html
      this.router.navigateByUrl('/shop');
      //console.log("User is logged in");
    }, error => {
      console.log(error);
    });
  }
  //#endregion
}
