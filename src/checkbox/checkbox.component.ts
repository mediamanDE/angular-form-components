import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    NgModel,
    ValidationErrors,
    Validator
} from '@angular/forms';

@Component({
    selector: 'mm-checkbox',
    template: `
        <div class="mm-checkbox">
            <input type="checkbox"
                   [attr.name]="name"
                   [id]="id"
                   [disabled]="disabled"
                   [value]="value"
                   [checked]="checked"
                   [required]="required"
                   (change)="onChange()"
                   (blur)="onBlur()"
                   class="mm-checkbox__field">
            <label [for]="id" class="mm-label mm-checkbox__label" [innerHTML]="label"></label>
        </div>`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckBoxComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => CheckBoxComponent),
            multi: true
        }
    ]
})
export class CheckBoxComponent implements ControlValueAccessor, Validator {

    /**
     * The checkbox name
     */
    @Input() public name: string;

    /**
     * The checkbox id
     */
    @Input() public id: string;

    /**
     * Flag to set the checkbox component to disabled
     */
    @Input() public disabled: boolean = false;

    /**
     * The checkbox value
     */
    @Input() public value: string = '';

    /**
     * The checkbox required state
     */
    @Input() public required: boolean;

    /**
     * The checkbox label
     */
    @Input() public label: string;


    /**
     * The checkbox checked state
     */
    @Input() public checked: boolean = false;

    /**
     * Propagate the change event
     */
    private propagateChange: Function;

    /**
     * Propagate the touched event
     */
    private propagateTouched: Function;

    /**
     * The ngModel instance of the checkbox element
     */
    @ViewChild(NgModel) private checkboxModel: NgModel;

    /**
     * @inheritDoc
     */
    public writeValue(value: string) {
        // We don't need this one.
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
    public validate(c: AbstractControl): ValidationErrors | any {
        if (!this.checkboxModel.touched) {
            return undefined;
        }

        return this.checkboxModel.errors;
    }

    /**
     * Propagates the changes to the parent form
     */
    public onChange() {
        if (!this.propagateChange) {
            return;
        }
        this.propagateChange(this.value);
    }

    /**
     * Mark the checkbox as touched for the parent form
     */
    public onBlur() {
        if (!this.propagateTouched) {
            return;
        }
        this.propagateTouched();
    }
}
