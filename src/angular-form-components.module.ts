import { NgModule } from '@angular/core';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './select/select.component';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from './radio-button/radio-button.component';

@NgModule({
    declarations: [
        InputComponent,
        SelectComponent,
        RadioButtonComponent
    ],
    imports: [
        FormsModule,
        CommonModule
    ],
    exports: [
        InputComponent,
        SelectComponent,
        RadioButtonComponent
    ]
})
export class AngularFormComponentsModule {
}
