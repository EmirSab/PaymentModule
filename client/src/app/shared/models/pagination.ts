import { IProduct } from "./product";

//#region 8.84.2 add pagination interface and properties -> app.ts
export interface IPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IProduct[];
}
//#endregion