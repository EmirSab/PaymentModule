import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
//#region 19.237 Add jwt interceptor for token -> app.module.ts
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        //get token
       const token = localStorage.getItem('token');
       // setting the headers that go towards api server
       if(token) {
           req = req.clone({
               setHeaders: {
                   Authorization: `Bearer ${token}`
               }
           });
       }
       return next.handle(req);
    }
//#endregion
}