import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root'
})
// 17.203 Creating authGuard (ng g g auth --skip-tests (canActivate)) ->
// adjust the state code
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
      // check if there is a user
    return this.accountService.currentUser$.pipe(
      map(auth => {
        if(auth) {
          return true;
        }
        // if there is no user
        this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
      })
    );
  }
}
