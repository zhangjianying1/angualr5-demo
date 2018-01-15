import { Injectable } from '@angular/core';

import { 
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
  
@Injectable()
export class JWTInterceptor implements HttpInterceptor {
	
	constructor() {}
	
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

	   
	    req = req.clone({
	      setHeaders: {
	      	'X-Requested-With': 'true',
	      	'token': '333',
	      	'userId': '123'
	      }
	    });
	    	console.log(req)
	    return next.handle(req);
	}
}