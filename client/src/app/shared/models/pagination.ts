import { IProduct } from "./product";

//#region 8.84.2 add pagination interface and properties -> app.ts
export interface IPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IProduct[];
}
// 21.284 Adding properties in order to cache pagination -> shop.service.ts
export class Pagination implements IPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IProduct[] = [];
}
//#endregion