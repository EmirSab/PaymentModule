import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { delay, finalize } from "rxjs/operators";
import { BusyService } from "../services/busy.service";
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    //12.130.1 Add loading interceptor -> app.module.ts
    constructor(private busyService: BusyService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        //17.202 Adding little loader when checking email
        if(!req.url.includes('emailexists')) {
            this.busyService.busy();
        }
        //this.busyService.busy();
        return next.handle(req).pipe(
            delay(1000),
            finalize(() => {
                this.busyService.idle();
            })
        );
    }

}