import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPagination } from './models/pagination';
import { IProduct } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
//#region 8.80.1 Add implements OnInit and http ->app.html
export class AppComponent implements OnInit{
  title = 'Skinet';
  // 8.84.1 Dodati product interface ->pagination.ts
  products: IProduct[];
  //products: any[];

  constructor(private http: HttpClient) {}

  // 8.84.3 Add IPagination ->
  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/products?pageSize=50').subscribe((response: IPagination) => {
      this.products= response.data;
    }, error => {
      console.log(error);
    });
  }
}
//#endregion
