import { NgModule } from '@angular/core';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './select/select.component';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { RadioButtonGroupComponent } from './radio-button/radio-button-group.component';

@NgModule({
    declarations: [
        InputComponent,
        SelectComponent,
        RadioButtonComponent,
        RadioButtonGroupComponent
    ],
    imports: [
        FormsModule,
        CommonModule
    ],
    exports: [
        InputComponent,
        SelectComponent,
        RadioButtonComponent,
        RadioButtonGroupComponent
    ]
})
export class AngularFormComponentsModule {
}
