import { Component, OnInit } from '@angular/core';
import {CountryService} from '../services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  providers: [CountryService]
})
export class CountryComponent implements OnInit {
  title = 'Angular Search Filter';
  searchText;

 countryList:any; 

  constructor(private data:CountryService) {  }
   onKeydown(event) {
    if (event.key === "Enter") {
      this.data.getCountries().subscribe(data => {
        this.countryList = data;
        
    });
    }
 }



  ngOnInit() {
  
  }

}
