import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  // 14.147 Add basket service method -> basket.service.ts
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id).
    pipe(map((basket: IBasket) => {
      this.basketSource.next(basket);
      console.log(this.getCurrentBasketValue());
    }));
  }

  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + 'basket', basket). subscribe((response: IBasket) => {
      this.basketSource.next(response);
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  //#region 14.148 Add products to the basket -> product.item.ts
  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  // method if item is already added to increase the quantity
  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
      // item is not found
      if (index === -1) {
        itemToAdd.quantity = quantity;
        items.push(itemToAdd);
      } else {
        // add quantity on already set quantity
        items[index].quantity += quantity;
      }
      return items;
    }
  
  // creating a basket
  private createBasket(): IBasket {
    const basket = new Basket();
    // storing id when the basket is created when user logs in again
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  //method for maping the properties from product to basket item
  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType
    };
  }
  //#endregion
}
