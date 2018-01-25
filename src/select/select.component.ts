import { Component, ViewChild, Input, forwardRef } from '@angular/core';
import {
    NgModel, AbstractControl, ValidationErrors, ControlValueAccessor, Validator,
    NG_VALUE_ACCESSOR, NG_VALIDATORS
} from '@angular/forms';
import { SelectOptionInterface } from './select-option.interface';

@Component({
    selector: 'mm-select',
    template: `<div class="mm-select">
                    <label [for]="name" class="mm-label mm-select__label" [innerHTML]="label"></label>
                    <select [name]="name"
                        [id]="id"
                        [(ngModel)]="value"
                        [required]="required"
                        (change)="onChange()"
                        (blur)="onBlur()"
                        class="mm-select__field">
                        <option *ngFor="let option of options" [ngValue]="option.value">{{ option.label }}</option>
                    </select>
                </div>`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ]
})
export class SelectComponent implements ControlValueAccessor, Validator {

    /**
     * The selects name
     */
    @Input() public name: string;

    /**
     * The selects id
     */
    @Input() public id: string;

    /**
     * The selects options
     */
    @Input() public options: SelectOptionInterface[] = [];

    /**
     * The selects required state
     */
    @Input() public required: boolean = false;

    /**
     * The selects label
     */
    @Input() public label: string;

    /**
     * The selected value
     */
    public value: string = '';

    /**
     * Propagate the change event
     */
    private propagateChange: Function;

    /**
     * Propagate the touched event
     */
    private propagateTouched: Function;

    /**
     * The ngModel instance of the select element
     */
    @ViewChild(NgModel) private selectModel: NgModel;

    /**
     * @inheritDoc
     */
    public writeValue(value: string) {
        this.value = value;
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
        if (!this.selectModel.touched) {
            return undefined;
        }

        return this.selectModel.errors;
    }

    /**
     * Propagates the changes to the parent form
     */
    public onChange() {
        this.propagateChange(this.value);
    }

    /**
     * Mark the select as touched for the parent form
     */
    public onBlur() {
        this.propagateTouched();
    }
}

