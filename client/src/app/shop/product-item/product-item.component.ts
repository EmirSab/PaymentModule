import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  // 9.92 Add logic for child component ->produc-item.html
  @Input() product: IProduct;
  constructor() { }

  ngOnInit(): void {
  }

}
