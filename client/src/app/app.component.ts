import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
//#region 8.80.1 Add implements OnInit and http ->app.html
export class AppComponent implements OnInit{
  title = 'Skinet';
  // 8.84.1 Dodati product interface ->pagination.ts

 // 14.150 Getting the basket if there is one getting the basket service ->
  constructor(private basketService: BasketService) {}

  // 8.84.3 Add IPagination ->
  ngOnInit(): void {
    //14.150 checking the localstorage for basket id
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log("initialized basket");
      }, error => {
        console.log(error);
      });
    }

  }
}
//#endregion
