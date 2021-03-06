import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from '../../models/basket';
import { IOrderItem } from '../../models/order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  //#region 19.238.2 Adding services and functions -> basket.component.html
  //basket$: Observable<IBasket>;
  @Output() decrement: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() increment: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  // 19.239.1 Add property to see if it is in basket component if is not hide options -> basket-summary.html
  @Input() isBasket = true;
  //#region 20.235 Adding the list of the orders -> basket-summary.html
  // more input properties
  // union type
  @Input() items: IBasketItem[] | IOrderItem[] = [];

  // styling input property so headers are the same of the table
  @Input() isOrder = false;

  //#endregion
  constructor() { }

  ngOnInit(): void {
    //this.basket$ = this.basketService.basket$;
  }
  decrementItemQuantity(item: IBasketItem) {
    this.decrement.emit(item);
  }
  incrementItemQuantity(item: IBasketItem) {
    this.increment.emit(item);
  }
  removeBasketItem(item: IBasketItem) {
    this.remove.emit(item);
  }
  //#endregion

}
