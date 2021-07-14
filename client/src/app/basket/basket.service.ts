import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  // 14.147 Add basket service method -> basket.service.ts
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  //14.153.1 Create another behaviour subject for totals -> order-total.ts
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  // 19.244
  shipping = 0;

  constructor(private http: HttpClient) { }

  //#region 21.263 Adding payment intent -> checkout.review.component.ts
  createPaymentIntent() {
    return this.http.post(this.baseUrl + 'payments/' + this.getCurrentBasketValue().id, {}).
    pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        console.log(this.getCurrentBasketValue());
      })
    )
  }
  //#endregion

  //#region 19.244 Including the shipping costs into total -> checkout-delivery.component.ts
  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.shipping = deliveryMethod.price;
    //#region 21.262.1 Updating the basket when selecting the shipping option -> checkout.component.ts
    const basket = this.getCurrentBasketValue();
    basket.deliveryMethodId = deliveryMethod.id;
    //#endregion
    this.CalculateTotals();
    //21.262.1
    this.setBasket(basket);
  }
  //#endregion
  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id).
    pipe(map((basket: IBasket) => {
      this.basketSource.next(basket);
      //14.153.1
      this.CalculateTotals();
    }));
  }

  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + 'basket', basket). subscribe((response: IBasket) => {
      this.basketSource.next(response);
      //14.153.1
      this.CalculateTotals();
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

  //#region 14.153.1 Calculating totals
  private CalculateTotals() {
    const basket = this.getCurrentBasketValue();
    //const shipping = 0;
    // 19.244 
    const shipping = this.shipping;
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({shipping, total, subtotal});
  }
  //#endregion

  //#region 14.155 Incrementing quantity of the items, decrement and delete ->basket.component.ts
  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }
  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(x => x.id === item.id)) {
      basket.items = basket.items.filter(i => i.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  //	19.246.1 Removing the basket when order is created -> checkout-payment.ts
  deleteLocalBasket(id: string) {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }
  
  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(() => {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    });
  }
  //#endregion
}
