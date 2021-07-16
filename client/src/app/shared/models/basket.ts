//#region 14.146 Add properties to the basket model, install uuid for
// unique id generation (npm install uuid)-> basket.service.ts
import uuid from 'uuid/v4';
export interface IBasket {
  id: string;
  items: IBasketItem[];
  //#region 21.262 Adding delivery method when page is refreshed or user is gone from the form -> basket.service.ts
  clientSecret?: string;
  paymentIntentId?: string;
  deliveryMethodId?: number;
  //#endregion

  //#region 21.264 Add shipping price to be included when page is refreshed -> CustomerBasket.cs
  shippingPrice?: number;
  //#endregion
}

export interface IBasketItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  brand: string;
  type: string;
}

export class Basket implements IBasket {
  id = uuid();
  items: IBasketItem[] = [];
}
//#endregion

//#region 14.153 Adding the intetface for totals -> basket.service.ts
export interface IBasketTotals {
    shipping: number;
    subtotal: number;
    total: number;
}
//#endregion
