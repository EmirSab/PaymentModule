import {  CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {

  // 21.268 Adding stepper ->
  @Input() appStepper: CdkStepper;
  // 20.253.3 Add basket observable -> order-totals.ts
  basket$: Observable<IBasket>;
  constructor(private basketService: BasketService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }
  
  //#region 21.263.1 Adding the functionality for payment intent -> checkout-review.component.html
  createPaymentIntent() {
    return this.basketService.createPaymentIntent().subscribe((response: any) => {
      this.toastr.success('Payment intent created');
      // 21.268 Adding stepper -> checkout.component.html
      this.appStepper.next();
    }, error => {
      console.log(error);
      this.toastr.error(error.message);
    })
  }
  //#endregion
}
