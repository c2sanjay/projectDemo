import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { product } from '../model/product';

@Injectable()
export class ProductService {
  private dataUrl = 'http://localhost:3000/product';
  constructor(private http:Http) { }

  saveProduct(obj:product):Observable<product[]>{
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.http.post(this.dataUrl+'/saveProduct', {'data':obj}, options)
    .pipe(map((res:Response) => res.json()));

  }
  getProduct():Observable<product[]>{
    return this.http.get(this.dataUrl + '/list')
    .pipe(map((res:Response) => res.json()));
  }
  updateProduct(obj:product):Observable<product[]> {
  let headers = new Headers({'Content-Type':'application/json'});
  let options = new RequestOptions({headers:headers});

  return this.http.put(this.dataUrl +'/updateProduct' , {'data': obj}, options)
  .pipe(map((res:Response) => res.json()));
  }

  delProduct(obj:string):Observable<product[]>{
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});

  return this.http.delete(this.dataUrl + '/delete/' + obj, options)
  .pipe(map((res: Response) => res.json()));

  }
}
