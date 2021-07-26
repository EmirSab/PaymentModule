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
  //shopParams = new ShopParams();
  //21.284.2 Setting the shop params as a type of Shop Params ->
  shopParams: ShopParams;
  totalCount: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price Low to High', value: 'priceAsc' },
    { name: 'Price High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {
    //21.284.2
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    ////21.285.1  adding true
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
  }

  //getProducts() {
    //21.285.1 Determening what will be cache used for -> shared.module.ts
    getProducts(useCache = false) {
    //21.284.2 delete shopParams
    //this.shopService.getProducts(this.shopParams).subscribe(
    this.shopService.getProducts(useCache).subscribe(  
    (response) => {
        this.products = response.data;
        // 9.98.3 dodati shopparams ->shop.html
        ////21.284.2 comment shopparams
        //this.shopParams.pageNumber = response.pageIndex;
        //this.shopParams.pageSize = response.pageSize;
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
    //#region 21.284.2
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    //#endregion
    //this.shopParams.brandId = brandId;
    // 9.104 resetovanje paga ->onPageChanged()
    //this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    //#region 21.284.2
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    //#endregion
    //this.shopParams.typeId = typeId;
    // 9.104 resetovanje paga
    //this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  //#endregion

  //#region 9.96 Add sorting logic
  onSortSelected(sort: string) {
    //#region 21.284.2
        const params = this.shopService.getShopParams();
    params.sort = sort;
        this.shopService.setShopParams(params);
        //#endregion
    //this.shopParams.sort = sort;
    this.getProducts();
  }
  //#endregion

  //#region 9.99.1 add onpagechanged ->shop.component.html
  onPageChanged(event: any) {
    //#region 21.284.2
    const params = this.shopService.getShopParams();
    //#endregion
    // 9.104.1 if in order not to send two api calls when filter is changed ->app.routing.module.ts
    //if (this.shopParams.pageNumber !== event) {
      //21.284.2
      if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      ////21.285.1 adding true
      this.getProducts(true);
    }
  }

  //#region 9.103.1
  onSearch() {
    //this.shopParams.search = this.searchTerm.nativeElement.value;
    // 9.104 resetovanje paga
    //this.shopParams.pageNumber = 1;
    //#region 21.284.2
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    //#endregion
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    //this.shopParams = new ShopParams();
    // 21.284.2 reseting the filters
    //const params = new ShopParams();
    //this.shopService.setShopParams(params);
    //#region 21.285.6 Fixing the reset method to reset types and brands -> shop.component.html
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    //#endregion
    this.getProducts();
  }
  //#endregion
}
