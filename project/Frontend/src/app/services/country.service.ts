import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CountryService {
 //apiURL: string = 'http://groupkt.com/country/get/all';
apiURL: string = '/assets/json/data.json';
  constructor(private http:HttpClient) { }

  getCountries() {
    return this.http.get(this.apiURL).pipe(map(data => data));
  }
}
