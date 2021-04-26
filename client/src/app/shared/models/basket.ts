//#region 14.146 Add properties to the basket model, install uuid for
// unique id generation (npm install uuid)-> basket.service.ts
import { v4 as uuidv4 } from 'uuid';
export interface IBasket {
  id: string;
  items: IBasketItem[];
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
  id = uuidv4();
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
