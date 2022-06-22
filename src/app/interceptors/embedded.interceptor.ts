import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class EmbeddedInterceptor implements HttpInterceptor {

  newBody: any;

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if((req.method == "POST" || req.method == "PUT") && req.url.includes("project"))
    {
      let data = req.body;
      this.newBody = {
        "id": data.id,
        "name": data.name,
        "date": data.date,
        "status": data.status,
        "users": {
          "_embedded": {
              "users": data.users
          }
        }
      }
      req = req.clone({ body: this.newBody });
    }

    return next.handle(req);
  }
}

