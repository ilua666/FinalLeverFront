import { LOCAL_STORAGE_TOKEN } from './resource';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authReq = request.clone({
      headers: request.headers.set('Authorization', 'Bearer '+ localStorage.getItem(LOCAL_STORAGE_TOKEN))
    });
    //request.headers.set('Authorization', 'Bearer '+ localStorage.getItem(LOCAL_STORAGE_TOKEN))
    return next.handle(authReq);
  }
}
