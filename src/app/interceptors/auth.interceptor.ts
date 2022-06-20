import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authService.getToken() != null)
    {
      const headers = new HttpHeaders()
        .append('Authorization', `Bearer ${this.authService.getToken()}`);
      const modifiedReq = req.clone({ headers });
      return next.handle(modifiedReq);
    }

    return next.handle(req);
  }
}
