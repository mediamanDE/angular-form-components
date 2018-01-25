import { NgModule } from '@angular/core';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './select/select.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        InputComponent,
        SelectComponent
    ],
    imports: [
        FormsModule,
        CommonModule
    ],
    exports: [
        InputComponent,
        SelectComponent
    ]
})
export class AngularFormComponentsModule {
}
