export interface IDeliveryMethod{
    //#region 19.235 Add properties for delivery method -> checkout.service.ts
    shortName: string;
    deliveryTime: string;
    description: string;
    price: number;
    id: number;
    //#endregion
}