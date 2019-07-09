import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {RegisterService} from '../services/register.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }
  intercept (req, next){
    let authService = this.injector.get(RegisterService);
    let tokenizedReq = req.clone({
      setHeaders :{
        Authorization: 'Bearer $(RegisterService.getToken()}'
      }
    })
    return next.handle(tokenizedReq)
  }
}
