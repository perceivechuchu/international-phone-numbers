import { Component, ElementRef, ViewChild } from '@angular/core';
import { PhoneNumbersService } from './phone-numbers.service';
import { Country } from './country';

@Component({
  selector: 'app-phone-numbers',
  templateUrl: 'phone-numbers.component.html',
  styleUrls: ['phone-numbers.component.scss']
})
export class PhoneNumbersComponent {

  profileEditRequest = {
    "country": "string"
  }

  user: any;

  allCountries: any;

  //selectedPostalCode: string;

  shortMobileNumber: string;

  selectedCountry: Country;

  countryFlagImageSource: string;

  value: string;

  //@ViewChild('selectdp') selectdp: ElementRef;
  
  public data: { [key: string]: Object }[];
// maps the appropriate column to fields property
public fields: Object = { text: 'countryName', value: 'postalCode' };
// set the height of the popup element
public height: string = '250px';
// set the placeholder to DropDownList input element
public watermark: string = 'Select country';

  constructor(public phoneNumbersService: PhoneNumbersService) {
    //this.selectdp.nativeElement.selectpicker('refresh');
  }

  ngOnInit(){
    this.getCountryDetails();
  }
  
  getCountryDetails(): void {
        this.allCountries = this.phoneNumbersService.allCountries.sort(this.dynamicSort("countryName"));
        this.data = this.allCountries;
        if(this.shortMobileNumber === null || this.shortMobileNumber === "" || this.shortMobileNumber === undefined){
          this.extractMobileNumberDetails(this.phoneNumbersService.selectedCountry, this.phoneNumbersService.selectedMobileNumber);
        }
  }

  dynamicSort(property: string) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}

onChange(postalCode: string){
  console.log("got country code: " + postalCode);
  this.phoneNumbersService.selectedPostalCode = postalCode;
  this.phoneNumbersService.selectedMobileNumber = this.phoneNumbersService.selectedPostalCode + this.shortMobileNumber;
  console.log("new full mobile number: " + this.phoneNumbersService.selectedMobileNumber);
  for(let i = 0; i<this.allCountries.length; i++){
    if(postalCode === this.allCountries[i].postalCode){
      this.phoneNumbersService.selectedCountry = this.allCountries[i].countryName;
      console.log("country name: " + this.phoneNumbersService.selectedCountry);
      break;
     } 
  }
}

retrieveMobileNumber(){
  this.phoneNumbersService.selectedMobileNumber = this.populateFullMobileNumber(this.phoneNumbersService.selectedPostalCode, this.shortMobileNumber);
  console.log("Retrieving mobile number: " + this.phoneNumbersService.selectedMobileNumber);
}

populateFullMobileNumber(postalCode: string, shortMobileNumber: string){
return postalCode + shortMobileNumber;
}

extractMobileNumberDetails(countryName: string, fullMobileNumber: string){
  for(let i = 0; i<this.allCountries.length; i++){
    if(countryName === this.allCountries[i].countryName){
      this.selectedCountry = this.allCountries[i];
      break;
     } 
  }
  this.phoneNumbersService.selectedPostalCode = this.selectedCountry.postalCode;
  this.shortMobileNumber = fullMobileNumber.replace(this.phoneNumbersService.selectedPostalCode, "");
  

  console.log("selectedPostalCode: " + this.phoneNumbersService.selectedPostalCode);
}

formatMobileNumber(){
  this.shortMobileNumber = this.shortMobileNumber.replace(/^0+/, '')
  console.log("formated mobile number: " + this.shortMobileNumber);
  this.phoneNumbersService.selectedMobileNumber = this.phoneNumbersService.selectedPostalCode + this.shortMobileNumber;
  console.log("selectedMobileNumber: " + this.phoneNumbersService.selectedMobileNumber);
}

/*processSelectedCountry(countryCode: string){
  for(let i = 0; i<this.allCountries.length; i++){
    if(countryCode === this.allCountries[i].countryCode){
      this.selectedCountry = this.allCountries[i];
      break;
     } 
  }
  this.phoneNumbersService.selectedPostalCode = this.selectedCountry.postalCode;
  console.log("selectedPostalCode: " + this.phoneNumbersService.selectedPostalCode);
  this.countryFlagImageSource = "http://localhost:4200/assets/country-flags/" + this.selectedCountry.countryCode.toLowerCase() + ".png";
}*/

}