import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IPagination, Pagination } from '../shared/models/pagination';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  // 9.88 Add HttpClient and base url ->shop.component.ts
  baseUrl = 'https://localhost:5001/api/';

  //#region 21.283 Addin chache on the frontend -> pagination.ts
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  //#endregion

  //#region 21.284.1 Adding the properties needed for chaching pagination -> shop.component.ts
  pagination = new Pagination();
  shopParams = new ShopParams();
  //#endregion

  constructor(private http: HttpClient) { }
  // 9.94 Add filter functionality ->shop.componenet.ts
  // 9.96.1 Add the parametar for sort ->shop.component.html

  // 9.98.2 add shop params ->shop.component.ts
  // 9.99 Add condition in if !=0 and paging ->shop.component.ts
  //getProducts(shopParams: ShopParams) {
  // 21.284.1 deleting the shop params and using the variable
  //getProducts() {
  //#region 21.285 Adding the cache to the methods -> shop.component.ts
  getProducts(useCache: boolean) {
    // if var is set to a false product array will be refreshed and empty
    // and new call will be sent to api
    if (useCache === false) {
      this.products = [];
    }
    if (this.products.length > 0 && useCache === true) {
      // paginating responses
      // how many pages I have received
      const pagesReceived = Math.ceil(this.products.length/this.shopParams.pageSize);

      // what page number is beign requested
      if (this.shopParams.pageNumber <= pagesReceived) {
        this.pagination.data = this.products.slice((this.shopParams.pageNumber - 1) * 
        this.shopParams.pageSize, this.shopParams.pageNumber * this.shopParams.pageSize);

        return of(this.pagination);
      }
    }
    //#endregion

    let params = new HttpParams();
    //9.94
    if(this.shopParams.brandId !== 0) {
      params = params.append('brandId', this.shopParams.brandId.toString());
    }

    if(this.shopParams.typeId !== 0) {
      params = params.append('typeId', this.shopParams.typeId.toString());
    }

    // 9.96.1
    if(this.shopParams.sort) {
      params = params.append('sort', this.shopParams.sort);
    }

    //#region 9.103.3 add conditions for search -> shop.html
    if(this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }
    //#endregion

    //#region 9.99
    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageIndex', this.shopParams.pageSize.toString());
    //#endregion

    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
    .pipe(
      map(response => {
        // 21.283 saving the data that is returned
        //this.products = response.body.data;
        // 21.284.1 appending the data that is returned
        this.products = [...this.products, ...response.body.data];
        this.pagination = response.body;
        return this.pagination;
      })
    );
  }

  //#region 21.284.1
  getShopParams() {
    return this.shopParams;
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }
  //#endregion

  //#region 9.93.2 Add methods to get types and brands ->shop.component.ts
  getBrands() {
    // 21.283 
    if(this.brands.length > 0) {
      return of(this.brands);
    }
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands').pipe(
      map(response => {
        this.brands = response;
        return response;
      })
    );
  }

  getTypes() {
    // 21.283
    if(this.types.length > 0) {
      return of(this.types);
    }
    return this.http.get<IType[]>(this.baseUrl + 'products/types').pipe(
      map(response => {
        this.types = response;
        return response;
      })
    );
  }
  //#endregion

  //#region 10.111 get individual product -> product-details.ts
  getProduct(id: number) {
    // 21.283 
    const product = this.products.find(p => p.id === id);
    if (product) {
      return of(product); // returns observable
    }
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }
  //#endregion
}
