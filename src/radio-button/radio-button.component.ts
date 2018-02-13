import { Component, forwardRef, ViewChild, Input, Inject, Optional, OnInit } from '@angular/core';
import {
    Validator,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS,
    ValidationErrors,
    AbstractControl,
    NgModel
} from '@angular/forms';
import { RadioButtonGroupComponent } from './radio-button-group.component';

@Component({
    selector: 'mm-radio-button',
    template: `<div class="mm-radiobutton">
                    <label [for]="id" class="mm-label mm-radiobutton__label" [innerHTML]="label"></label>
                    <input [type]="'radio'"
                        [attr.name]="name"
                        [id]="id"
                        [value]="value"
                        [(ngModel)]="model"
                        [checked]="checked"
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
export class RadioButtonComponent implements OnInit, ControlValueAccessor, Validator {

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
     * Get the parent radio button groups required state if
     * the internal required state is false and the parent
     * radio button group exists.
     */
    @Input()
    public get required(): boolean {
        return (this._required || this.radioButtonGroup && this.radioButtonGroup.required);
    }

    public set required(value: boolean) {
        this._required = value;
    }

    /**
     * The radio buttons label
     */
    @Input() public label: string;

    /**
     * The radio buttons ngModel
     */
    public get model(): string {
        return this._model;
    }

    public set model(value: string) {
        this._model = value;

        this.checked = (this.model === this.value);
    }

    /**
     * The radio buttons checked state
     */
    public checked: boolean = false;

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
     * The internal required state
     * Gets read and set by TS getter/setters
     */
    private _model: string;

    /**
     * The internal required state
     * Gets read and set by TS getter/setters
     */
    private _required: boolean = false;

    /**
     * @param [radioButtonGroup] - The parent radio button group
     */
    public constructor(@Optional() @Inject(forwardRef(() => RadioButtonGroupComponent))
                       private radioButtonGroup: RadioButtonGroupComponent) {
    }

    /**
     * @inheritDoc
     */
    public ngOnInit() {

        // Try to apply the parent radio button groups properties
        if (this.radioButtonGroup) {
            this.name = this.radioButtonGroup.name;
        }
    }

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
        if (this.radioButtonGroup) {
            this.radioButtonGroup.value = this.value;
        }

        if (!this.propagateChange) {
            return;
        }
        this.propagateChange(this.value);
    }

    /**
     * Mark the radio button as touched for the parent form
     */
    public onBlur() {
        if (!this.propagateTouched) {
            return;
        }
        this.propagateTouched();
    }
}
