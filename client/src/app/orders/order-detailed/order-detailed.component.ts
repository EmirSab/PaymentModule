import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/models/order';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {

  //20.253.7 Add logic to the the list of orderes -> order.service.ts
  order: IOrder;

  constructor(private route: ActivatedRoute, 
    private breadcrumbService: BreadcrumbService, 
    private ordersService: OrdersService) {
    this.breadcrumbService.set('@OrderDetailed', '');
  }
  ngOnInit(): void {
    this.ordersService.getOrderDetailed(+this.route.snapshot.paramMap.get('id'))
    .subscribe((order: IOrder) => {
    this.order = order;
    console.log(order);
    this.breadcrumbService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
  }, error => {
    console.log(error);
  });
  }

}
/* loadProduct() {
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(product => {
      this.product = product;
         // 12.126.1
         this.bcService.set('@productDetails', product.name);
        }, error => {
          console.log(error);
        }); */