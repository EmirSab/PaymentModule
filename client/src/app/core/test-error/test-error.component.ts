import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  // 11.116.3 Add logic for errorr testing ->test-error.html
  baseUrl = environment.apiUrl;

  //11.120.1 add validation error variable -> test-error.html
  validationErrors: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  //#region 11.116.3
  get404Error() {
    this.http.get(this.baseUrl + 'products/42').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  get400ValidationError() {
    this.http.get(this.baseUrl + 'products/fortytwo').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      //11.120.1
      this.validationErrors = error.errors;
    });
  }
//#endregion
}
