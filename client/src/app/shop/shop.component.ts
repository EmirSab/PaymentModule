import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  // 9.103.1 add View child in order to access #search ->shop.html
  //12.131.1 Change true into false -> product-details.ts
  @ViewChild('search', { static: false }) searchTerm: ElementRef;
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
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price Low to High', value: 'priceAsc' },
    { name: 'Price High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(
      (response) => {
        this.products = response.data;
        // 9.98.3 dodati shopparams ->shop.html
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //#region 9.93.3 call getbrands() and getTypes() -> shop.compomenet.html
  getBrands() {
    this.shopService.getBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTypes() {
    this.shopService.getTypes().subscribe(
      (response) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
        console.log(this.types);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //#endregion

  //#region 9.94.1
  //9.98.3 add shopparams in rest of the methods ->
  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    // 9.104 resetovanje paga ->onPageChanged()
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    // 9.104 resetovanje paga
    this.shopParams.pageNumber = 1;
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
    // 9.104.1 if in order not to send two api calls when filter is changed ->app.routing.module.ts
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  //#region 9.103.1
  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    // 9.104 resetovanje paga
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
  //#endregion
}
