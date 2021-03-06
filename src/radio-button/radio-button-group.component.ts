import { Component, ContentChildren, forwardRef, Input, QueryList } from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator
} from '@angular/forms';
import { RadioButtonComponent } from './radio-button.component';

@Component({
    selector: 'mm-radio-button-group',
    template: `
        <div [ngClass]="{
                'mm-radiobutton-group': true, 
                'mm-radiobutton-group--invalid': validate(), 
                'mm-radiobutton-group--disabled': disabled
            }">
            <ng-content></ng-content>

            <span class="mm-radio-button__error"
                  *ngIf="validate()"
                  [innerHTML]="errorMessage"></span>

            <span *ngIf="hint" class="mm-form-hint mm-radio-button__hint" [innerHTML]="hint"></span>
        </div>`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioButtonGroupComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => RadioButtonGroupComponent),
            multi: true
        }
    ]
})
export class RadioButtonGroupComponent implements Validator, ControlValueAccessor {

    /**
     * The radio button groups required state
     */
    @Input() public required: boolean = false;

    /**
     * The radio button groups name
     * Will be the name of all contained radio buttons
     */
    @Input()
    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;

        // Update the name of all radio button children
        if (this.radioButtons) {
            this.radioButtons.forEach((radioButton: RadioButtonComponent) => radioButton.name = this._name);
        }
    }

    /**
     * The radio button groups hint text
     */
    @Input() public hint: string;

    /**
     * Flag to set the radio button group component to disabled
     */
    @Input() public disabled: boolean = false;

    /**
     * All radio button children
     */
    @ContentChildren(forwardRef(() => RadioButtonComponent)) public radioButtons: QueryList<RadioButtonComponent>;

    /**
     * The radio button groups value
     * Derived from the selected radio button child
     */
    public get value(): string {
        return this._value;
    }

    public set value(value: string) {
        this._value = value;

        if (this.propagateChange) {
            this.propagateChange(this.value);
        }
    }

    /**
     * The inputs error message
     */
    @Input() public errorMessage: string = 'Bitte überprüfen Sie Ihre Eingabe.';

    /**
     * The internal name property
     * Gets read and set by TS getter/setters
     */
    private _name: string;

    /**
     * The internal value property
     * Gets read and set by TS getter/setters
     */
    private _value: string;

    /**
     * Propagate the change event
     */
    private propagateChange: Function;

    /**
     * @inheritDoc
     */
    public writeValue(value: string) {
        this.value = value;

        // Update the model of all radio button children
        if (this.radioButtons) {
            this.radioButtons.forEach((radioButton: RadioButtonComponent) => radioButton.model = this.value);
        }
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

        // Register the touched event on all radio button children
        if (this.radioButtons) {
            this.radioButtons.forEach((radioButton: RadioButtonComponent) => radioButton.registerOnTouched(fn));
        }
    }

    /**
     * @inheritDoc
     */
    public validate(c?: AbstractControl): ValidationErrors | any {
        if (!this.required) {
            return;
        }

        if (!this.radioButtons) {
            return undefined;
        }

        const checkedRadioButtons = this.radioButtons.find((radioButton: RadioButtonComponent) => radioButton.checked);
        if (!checkedRadioButtons) {
            return {required: true};
        }

        return undefined;
    }
}
