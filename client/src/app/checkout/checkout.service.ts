import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IOrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  //#region 19.246 Submiting the order -> basket.service.ts
  creatOrder(order: IOrderToCreate) {
    return this.http.post(this.baseUrl + 'orders', order);
  }
  //#endregion

  //#region 19.235 Add methos for getting the delivery methods -> checkout-delivery.component.ts
  getDeliveryMethods() {
    return this.http.get(this.baseUrl + 'orders/deliveryMethods').pipe(
      map((dm: IDeliveryMethod[]) => {
        return dm.sort((a, b) => b.price - a.price);
      })
    );
  }
  //#endregion


}
