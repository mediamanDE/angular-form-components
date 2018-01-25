import { Component, forwardRef, ViewChild, Input } from '@angular/core';
import {
    Validator, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidationErrors,
    AbstractControl, NgModel
} from '@angular/forms';

@Component({
    selector: 'mm-radio-button',
    template: `<div class="mm-radiobutton">
                    <label [for]="id" class="mm-label mm-radiobutton__label" [innerHTML]="label"></label>
                    <input [type]="'radio'"
                        [attr.name]="name"
                        [id]="id"
                        [value]="value"
                        [(ngModel)]="model"
                        [required]="required"
                        (change)="onChange()"
                        (blur)="onBlur()"
                        class="mm-radiobutton__field">
                </div>`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioButtonComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => RadioButtonComponent),
            multi: true
        }
    ]
})
export class RadioButtonComponent implements ControlValueAccessor, Validator {

    /**
     * The radio buttons name
     */
    @Input() public name: string;

    /**
     * The radio buttons id
     */
    @Input() public id: string;

    /**
     * The radio buttons value
     */
    @Input() public value: string = '';

    /**
     * The radio buttons required state
     */
    @Input() public required: boolean = false;

    /**
     * The radio buttons label
     */
    @Input() public label: string;

    /**
     * The radio buttons ngModel
     */
    public model: string;

    /**
     * Propagate the change event
     */
    private propagateChange: Function;

    /**
     * Propagate the touched event
     */
    private propagateTouched: Function;

    /**
     * The ngModel instance of the radio button element
     */
    @ViewChild(NgModel) private radioButtonModel: NgModel;

    /**
     * @inheritDoc
     */
    public writeValue(value: string) {
        this.model = value;
    }

    /**
     * @inheritDoc
     */
    public registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    /**
     * @inheritDoc
     */
    public registerOnTouched(fn: Function) {
        this.propagateTouched = fn;
    }

    /**
     * @inheritDoc
     */
    public validate(c: AbstractControl): ValidationErrors|any {
        if (!this.radioButtonModel.touched) {
            return undefined;
        }

        return this.radioButtonModel.errors;
    }

    /**
     * Propagates the changes to the parent form
     */
    public onChange() {
        this.propagateChange(this.value);
    }

    /**
     * Mark the radio button as touched for the parent form
     */
    public onBlur() {
        this.propagateTouched();
    }
}
