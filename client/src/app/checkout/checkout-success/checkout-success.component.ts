import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {
  // 19.248.2
  order: IOrder;
  constructor(private router: Router) { 
    //#region 19.248.2 Add logic for the success component -> checkout-routing.module
    const navigation = this.router.getCurrentNavigation();
    const state = navigation && navigation.extras && navigation.extras.state;
    if (state) {
      this.order = state as IOrder;
    }
    //#endregion
  }

  ngOnInit(): void {
  }

}
