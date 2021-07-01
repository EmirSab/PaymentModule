import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  //#region 20.253.8 Create getOrderDetailed() ->
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrdersForUser() {
    return this.http.get(this.baseUrl + 'orders');
  }

  getOrderDetailed(id: number) {
    console.log(this.http.get(this.baseUrl + 'orders/' + id));
    return this.http.get(this.baseUrl + 'orders/' + id);
  }

  //#endregion
}
