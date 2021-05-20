import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  // 14.151 Displaying items in nav-bar -> nav-bar.html
  basket$: Observable<IBasket>;
  // 17.192 Adding user to the nav-bar -> nav-bar.component.html
  currentUser$: Observable<IUser>;
  constructor(private basketService: BasketService, private accountService: AccountService) { }

  ngOnInit(): void {
    // 14.151 
    this.basket$ = this.basketService.basket$;
    // 17.192
    this.currentUser$ = this.accountService.currentUser$;
  }

}
