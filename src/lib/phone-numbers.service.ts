import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from './country';

@Injectable()
export class PhoneNumbersService {

  public headers: Headers;

  public selectedMobileNumber: string;

  public selectedPostalCode: string;

  public selectedCountry: string;

  constructor(private http: Http) {

   }

getCountryData(): Observable<Array<Country>> {
  return this.http
           .get('/assets/countries-details.json')
           .pipe(map((response: Response) => {
               return <Array<Country>>response.json();
           }))
}

isMobileNumberValid(mobileNumber: string) {
      let regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
       console.log("mobile: " + mobileNumber);
      if (regex.test(mobileNumber)) {
          return true;
      } else {
          return false;
      }
  }
  
}
