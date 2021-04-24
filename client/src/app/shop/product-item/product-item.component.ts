import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  // 9.92 Add logic for child component ->produc-item.html
  @Input() product: IProduct;
  // 14.149 Adding items to basket -> product.item.html
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }

  //#region 14.149
  addItemToBasket() {
    this.basketService.addItemToBasket(this.product);
  }
  //#endregion

}
