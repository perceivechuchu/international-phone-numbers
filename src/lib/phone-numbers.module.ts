import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PhoneNumbersComponent } from './phone-numbers.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule } from '@angular/forms';

const components = [
  PhoneNumbersComponent
];

@NgModule({
  imports: [
    CommonModule,
    DropDownListModule,
    FormsModule
  ],
  declarations: [
    ...components,
  ],
  exports: [PhoneNumbersComponent]
})
export class PhoneNumbersModule { }
