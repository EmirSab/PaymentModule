import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/internal/operators';

//10.118 Add error.interceptor file for intercepting errors -> app.module.ts
// 11.119.2 Add warnings with tostr ->error.interceptor
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private toastr: ToastrService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        return next.handle(req).pipe(
            //12.130 Add delay to add spiner ->app.module.ts
            delay(1000),
            catchError(error => {
                if(error) {
                    if(error.status === 400) {
                        // 11.120 add error condition -> test-error.component.ts
                        if(error.error.errors) {
                            throw error.error;
                        } else {
                            this.toastr.error(error.error.message, error.error.statusCode);
                        }  
                    }
                    if(error.status === 401) {
                        this.toastr.error(error.error.message, error.error.statusCode);
                    }
                    if(error.status === 404) {
                        this.router.navigateByUrl('/not-found');
                    }
                    if(error.status === 500) {
                        // 11.121 Take error details and show it on frontend -> server-error.ts
                        const navigationExtras: NavigationExtras = {state:{error: error.error}};
                        this.router.navigateByUrl('/server-error', navigationExtras);
                    }
                }
                return throwError(error);
            })
        )
    }

}