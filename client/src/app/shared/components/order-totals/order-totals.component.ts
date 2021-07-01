import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketTotals } from '../../models/basket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {

  // 14.154 Create new component ng g c order-totals --skip-tests, geting the totals -> order-totals.html
  //basketTotal$: Observable<IBasketTotals>;

  //#region 20.253.4 Add shippingprice, subtotal and total -> order-totals.html
  @Input() shippingPrice: number;
  @Input() subtotal: number;
  @Input() total: number;
  //#endregion
  constructor() { }

  ngOnInit(): void {
    //this.basketTotal$ = this.basketService.basketTotal$;
  }

}
