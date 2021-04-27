import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  // 14.151.2 Display items in backet component -> basket.html
  basket$: Observable<IBasket>;
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  //#region 14.156 Add the methods to basket component -> basket.component.html
  removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }

  incrementItemQuantity(item: IBasketItem) {
    this.basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: IBasketItem) {
    this.basketService.decrementItemQuantity(item);
  }
  //#endregion

}
