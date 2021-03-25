import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  // 9.89 Add ShopService logic -> shop.component.html
  products: IProduct[];

  //9.93.3
  brands: IBrand[];
  types: IType[];

  //9.94.1 Add properties for filter ->shop.component.html
  //brandIdSelected = 0;
  //typeIdSelected = 0;
  // 9.96 Add sorting logic ->shop.service
  //sortSelected = 'name';

  // 9.98.1 add shop params ->shop.service.ts
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price Low to High', value: 'priceAsc'},
    {name: 'Price High to Low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }


  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      // 9.98.3 dodati shopparams ->shop.html
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    })
  }

  //#region 9.93.3 call getbrands() and getTypes() -> shop.compomenet.html
  getBrands() {
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response];
      console.log(this.types);
    }, error => {
      console.log(error);
    });
  }
  //#endregion

  //#region 9.94.1
  //9.98.3 add shopparams in rest of the methods ->
  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.getProducts();
  }
  //#endregion

  //#region 9.96 Add sorting logic
  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }
  //#endregion

  //#region 9.99.1 add onpagechanged ->shop.component.html
  onPageChanged(event: any) {
    this.shopParams.pageNumber = event.page;
    this.getProducts();
  }

}
