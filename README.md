# Angular 7 international phone numbers module

[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](http://opensource.org/licenses/MIT)

This is a simple library that provides component and service for dealing with capturing and validating international phone numbers. It allows you to create a phone number field with country flag, country name and country postal code dropdown.

## Requirements
- [NPM](https://npmjs.org/) - Node package manager


## Installation

- run `npm install international-phone-numbers`
- import `PhoneNumbersModule` and `PhoneNumbersService` in your app's main module `app.module.ts`,
- add `PhoneNumbersModule` under imports and `PhoneNumbersService` under providers, e.g.:

```
// other imports
// ...
import { PhoneNumbersModule, PhoneNumbersService } from 'phone-numbers';
// ...

@NgModule({
    imports: [
        // other imports
        // ...
        PhoneNumbersModule,
        // ...
    ],
	providers: [
    PhoneNumbersService
  ]
})

```

## Usage

Place phone numbers component selector in a template, for example in `AppComponent` or any other component you would want to use the selector:

```
import { Component } from "@angular/core";

@Component({
    selector: 'my-app',
    template: `
        <phone-numbers></phone-numbers>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {}
```

Also import PhoneNumbersService in the same component where you are accessing the phone numbers selector in order to get formatted phone number e.g.:

```
import { Component } from "@angular/core";
import { PhoneNumbersService } from 'phone-numbers';

@Component({
    selector: 'my-app',
    template: `
        <phone-numbers></phone-numbers>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {}
```

`PhoneNumbersService` stores selected phone number, selected postal code and selected country, therefore those values can be retrieved from the service on changing values from selector.
Secondly, `PhoneNumbersService` validates the entered mobile number is valid.

```
private selectedMobileNumber: string;
private selectedPostalCode: string;
private selectedCountry: string;
private isMobileNumberValid: boolean;

constructor(private phoneNumbersService: PhoneNumbersService, ...) {
// ...
}

// getting selected phone number
this.selectedMobileNumber = this.phoneNumbersService.selectedMobileNumber;

// getting selected postal code
this.selectedPostalCode = this.phoneNumbersService.selectedPostalCode;

// getting selected country
this.selectedCountry = this.phoneNumbersService.selectedCountry;

// validating phone number
this.isMobileNumberValid = this.phoneNumbersService.isMobileNumberValid();

```

## Feedback

Please [leave your feedback](https://github.com/perceivechuchu/international-phone-numbers/issues) if you have noticed any issue or have a feature request.

## License

The repository code is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).