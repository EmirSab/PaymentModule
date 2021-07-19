import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IOrder } from 'src/app/shared/models/order';
import { CheckoutService } from '../checkout.service';

declare var Stripe;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {
  // 19.248
  @Input() checkoutForm: FormGroup;

  //#region 21.266
  //viewchild to get access to html template reference
  @ViewChild('cardNumber', { static: true }) cardNumberElement: ElementRef;
  @ViewChild('cardExpiry', { static: true }) cardExpiryElement: ElementRef;
  @ViewChild('cardCvc', { static: true }) cardCvcElement: ElementRef;
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  //#endregion
  // 21.267 binding to class
  cardHandler = this.onChange.bind(this);

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  //#region 21.266 Adding stripe elements into component
  //instead of ngoninit it needs to be ngAfterViewInit
  /*ngOnInit(): void {
  }*/

  ngAfterViewInit() {
    this.stripe = Stripe(
      'pk_test_51J9chTGfXLXdWZmRfaiIwJuWmLyhWur1Py8V2ArZ48h5vWW8UviQLUf7rJMuqDa6uaXhr5uXqwsj8kKVgkKtfyyL00OoldXCsv'
    );
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    // 21.267 add event listeners
    this.cardNumber.addEventListener('change', this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    // 21.267 add event listeners
    this.cardExpiry.addEventListener('change', this.cardHandler);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    // 21.267 add event listeners
    this.cardCvc.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }
  //#endregion

  //#region 21.267 Displaying validation errors beneith the fields -> checkout-payment.html
  onChange({ error }) {
    if (error) {
      this.cardErrors = error.message;
    } else {
      this.cardErrors = null;
    }
  }
  //#endregion

  //#region 19.248 Add submitOrder() -> checkout-success.ts
  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.creatOrder(orderToCreate).subscribe(
      (order: IOrder) => {
        this.toastr.success('Order created successfully');
        //#region 21.269 Submiting the payment -> Order.cs
        // adding stripe funcionality
        // confirm card payment
        this.stripe.confirmCardPayment(basket.clientSecret, {
          payment_method: {
            card: this.cardNumber,
            billing_details: {
              name: this.checkoutForm.get('paymentForm').get('nameOnCard').value
            }
          }
        }).then(result => {
          console.log(result);
            // in case that payment is successuful
            if (result.paymentIntent) {
              this.basketService.deleteLocalBasket(basket.id);
              const navigationExtras: NavigationExtras = {state: order};
              this.router.navigate(['checkout/success'], navigationExtras);
            } else {
              this.toastr.error(result.error.message);
            }
          });
        //#endregion
      },
      (error) => {
        this.toastr.error(error.message);
        console.log(error);
      }
    );
  }

  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm
        .get('deliveryForm')
        .get('deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value,
    };
  }
  //#endregion
}
