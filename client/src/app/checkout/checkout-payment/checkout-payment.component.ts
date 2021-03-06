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

  // 21.272
  loading = false;

  //#region 21.275
  // using the fields to disable the button until they are true
  cardNumberValid = false;
  cardExpiryValid = false;
  cardCvcValid = false;
  //#endregion

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
  /*onChange({ error }) {
    if (error) {
      this.cardErrors = error.message;
    } else {
      this.cardErrors = null;
    }
  }*/
  // 21.275 Validation of the stripe elements -> checkout-payment.html
  // for each element we need to chech the status
  onChange(event) {
    if (event.error) {
      this.cardErrors = event.error.message;
    } else {
      this.cardErrors = null;
    }
    switch (event.elementType) {
      case 'cardNumber':
        this.cardNumberValid = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryValid = event.complete;
        break;
      case 'cardCvc':
        this.cardCvcValid = event.complete;
        break;
    }
  }
  //#endregion

  //#region 19.248 Add submitOrder() -> checkout-success.ts
  // 21.272 Improving the order submition -> loading.interceptor.ts
  // add async
  async submitOrder() {
    // 21.272
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();

    try {
      const createdOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);
      if (paymentResult.paymentIntent) {
        //this.basketService.deleteLocalBasket(basket.id);
        //21.277.2 Deleting the basket -> PaymentsController
        this.basketService.deleteBasket(basket);
        const navigationExtras: NavigationExtras = { state: createdOrder };
        this.router.navigate(['checkout/success'], navigationExtras);
      } else {
        this.toastr.error(paymentResult.error.message);
      }
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }

    //const orderToCreate = this.getOrderToCreate(basket);
    /*this.checkoutService.creatOrder(orderToCreate).subscribe(
      (order: IOrder) => {
        //this.toastr.success('Order created successfully');
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
    );*/
  }

  //#region 21.272 Improving the order submition ->
  private async confirmPaymentWithStripe(basket) {
    return this.stripe.confirmCardPayment(basket.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkoutForm.get('paymentForm').get('nameOnCard').value,
        },
      },
    });
  }

  private async createOrder(basket: IBasket) {
    const orderToCreate = this.getOrderToCreate(basket);
    return this.checkoutService.creatOrder(orderToCreate).toPromise();
  }
  //#endregion

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
