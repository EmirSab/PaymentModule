import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
//#region 17.187 Creating login ->login.component.html
baseUrl = environment.apiUrl;
//17.204 Changing the type of observable to ReplaySubject -> app.component.ts
private currentUserSource = new ReplaySubject<IUser>(1);
currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient, private router: Router) { }

  
  //#region 17.193 Keeping the user loggedin -> app.component.ts
  loadCurrentUser(token: string) {
    //#region 17.204.2 Check for the presence of the token ->
    if(token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }
    //#endregion

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', {headers}).pipe(
      map((user: IUser) => {
        if(user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }
  //#endregion

  login(values: any) {
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if(user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(values:any) {
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        if(user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email:string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }
  //#endregion
}
