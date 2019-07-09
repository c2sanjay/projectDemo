import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/Operators';
import {register} from '../model/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private dataUrl = 'http://localhost:3000/register';

  constructor(private http: Http) { }

  saveRegisterData(obj:register): Observable < register[]>{

    let header = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:header});

    return this.http.post(this.dataUrl + '/saveRegister',obj, options)
    .pipe(map((res:Response) => res.json()));

  }
  saveLoginData(obj:register):Observable <any> {

    let header = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:header});

    return this.http.post(this.dataUrl +'/signin', obj, options)
    .pipe(map((res:Response) => res.json()));

  }
getToken(){
  return localStorage.getItem('token');
}

}
