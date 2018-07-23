import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import {
    AbstractControl,
    ControlContainer,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    NgForm,
    NgModel,
    ValidationErrors,
    Validator
} from '@angular/forms';
import { AbstractFormControl } from '../abtract-form-control';

@Component({
    selector: 'mm-input',
    template: `
        <div [ngClass]="{'mm-input': true, 'mm-input--invalid': (control && control.touched && !control.valid)}"
             ngModelGroup="value">
            <label [for]="name" class="mm-label mm-input__label" [innerHTML]="label"></label>
            <input [type]="type"
                   [name]="name"
                   [id]="id"
                   [(ngModel)]="value"
                   [required]="required"
                   [pattern]="pattern"
                   (change)="onChange()"
                   (blur)="onBlur()"
                   (focus)="onFocus()"
                   class="mm-input__field"
                   #input>
            <span class="mm-input__error"
                  *ngIf="control && control.touched && !control.valid"
                  [innerHTML]="errorMessage"></span>
        </div>`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ],
    viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class InputComponent extends AbstractFormControl implements ControlValueAccessor, Validator {

    /**
     * Emit when the input element gains focus
     */
    @Output() public focused: EventEmitter<Event> = new EventEmitter<Event>();

    /**
     * The input name
     */
    @Input() public name: string;

    /**
     * The input id
     */
    @Input() public id: string;

    /**
     * The input type
     */
    @Input() public type: string = 'text';

    /**
     * The inputs required state
     */
    @Input() public required: boolean = false;

    /**
     * Regex for the input validation
     * Need required set to true in order to take effect
     */
    @Input() public pattern: string = '';

    /**
     * The inputs label
     */
    @Input() public label: string;

    /**
     * The inputs error message
     */
    @Input() public errorMessage: string = 'Bitte überprüfen Sie Ihre Eingabe.';

    /**
     * The input value
     */
    public value: string | number;

    /**
     * Propagate the change event
     */
    private propagateChange: Function;

    /**
     * Propagate the touched event
     */
    private propagateTouched: Function;

    /**
     * The ngModel instance of the input element
     */
    @ViewChild(NgModel) private inputModel: NgModel;

    /**
     * The input element
     */
    @ViewChild('input') private inputElement: ElementRef;

    /**
     * @inheritDoc
     */
    public writeValue(value: string | number) {
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
    public validate(c: AbstractControl): ValidationErrors | any {
        if (!this.inputModel.touched) {
            return undefined;
        }

        return this.inputModel.errors;
    }

    /**
     * Propagates the changes to the parent form
     */
    public onChange() {
        if (this.propagateChange) {
            this.propagateChange(this.value);
        }
    }

    /**
     * Mark the input as touched for the parent form
     */
    public onBlur() {
        if (this.propagateTouched) {
            this.propagateTouched();
        }
    }

    /**
     * Bring focus to the input element
     */
    public focus() {
        (this.inputElement.nativeElement as HTMLInputElement).focus();
    }

    /**
     * Propagate the focus event to the parent form
     *
     * @param e
     */
    public onFocus(e: Event) {
        this.focused.emit(e);
    }
}
