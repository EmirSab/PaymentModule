import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  //10.111.1 Add method and property for loading product ->product-detail.html
  product: IProduct;
  // 14.157 Connecting product-detail to basket -> product-details.html
  quantity = 1;
  // 12.126.1 Add breadcrumb service -> styles.sccs
  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService) {
      //#region 12.131.2 to change from product number to title -> product-detail.html
      this.bcService.set('@productDetails', '');
      //#endregion
     }

  ngOnInit(): void {
    this.loadProduct();
  }

  //#region 14.157
  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }
  incrementQuantity() {
    this.quantity++;
  }
  decrementQuantity() {
    if (this.quantity > 1) {
    this.quantity--;
    }
  }
  //#endregion

  //#region 10.111.1
  loadProduct() {
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(product => {
      this.product = product;
         // 12.126.1
         this.bcService.set('@productDetails', product.name);
        }, error => {
          console.log(error);
        });
  }
  //#endregion

}
