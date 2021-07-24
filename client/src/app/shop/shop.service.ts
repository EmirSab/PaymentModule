import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IPagination } from '../shared/models/pagination';
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

  //#region 21.283 Addin chache on the frontend ->
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  //#endregion

  constructor(private http: HttpClient) { }
  // 9.94 Add filter functionality ->shop.componenet.ts
  // 9.96.1 Add the parametar for sort ->shop.component.html

  // 9.98.2 add shop params ->shop.component.ts
  // 9.99 Add condition in if !=0 and paging ->shop.component.ts
  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    //9.94
    if(shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }

    if(shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    // 9.96.1
    if(shopParams.sort) {
      params = params.append('sort', shopParams.sort);
    }

    //#region 9.103.3 add conditions for search -> shop.html
    if(shopParams.search) {
      params = params.append('search', shopParams.search);
    }
    //#endregion

    //#region 9.99
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageIndex', shopParams.pageSize.toString());
    //#endregion

    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
    .pipe(
      map(response => {
        // 21.283
        this.products = response.body.data;
        return response.body;
      })
    );
  }

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
