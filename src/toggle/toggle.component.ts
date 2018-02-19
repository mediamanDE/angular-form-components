import { Component, forwardRef, Input } from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS,
    ControlValueAccessor,
    Validator,
    AbstractControl,
    ValidationErrors
} from '@angular/forms';

@Component({
    selector: 'mm-toggle',
    styles: [`
        .mm-toggle__field {
            display: none;
        }
        .mm-toggle__slider {
            display: flex;
            position: relative;
            width: 50px;
            height: 30px;
            align-items: center;
            background: #fff;
        }
        .mm-toggle__slider::before {
            display: inline-block;
            position: absolute;
            width: 24px;
            height: 24px;
            content: '';
            background: #ff0000;
            transform: translateX(2px);
            transition: transform 200ms ease-in-out;
        }
        .mm-toggle--active .mm-toggle__slider::before {
            transform: translateX(100%);
        }
    `],
    template: `<div [ngClass]="{'mm-toggle': true, 'mm-toggle--active': model}">
                    <input [type]="'checkbox'"
                        [attr.name]="name"
                        [id]="id"
                        [required]="required"
                        [(ngModel)]="model"
                        (change)="onChange()"
                        (blur)="onBlur()"
                        class="mm-toggle__field">
                    <div class="mm-toggle__slider" (click)="onChange()"></div>
                    <label [for]="id" class="mm-label mm-toggle__label" [innerHTML]="label"></label>
                </div>`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ToggleComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ToggleComponent),
            multi: true
        }
    ]
})
export class ToggleComponent implements ControlValueAccessor, Validator {

    /**
     * The toggles name
     */
    @Input() public name: string;

    /**
     * The toggles id
     */
    @Input() public id: string;

    /**
     * The toggles required state
     */
    @Input() public required: boolean = false;

    /**
     * The toggles label
     */
    @Input() public label: string;

    /**
     * The toggles ngModel
     */
    public model: boolean;

    /**
     * Propagate the change event
     */
    private propagateChange: Function;

    /**
     * Propagate the touched event
     */
    private propagateTouched: Function;

    /**
     * @inheritDoc
     */
    public writeValue(value: boolean) {
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
        if (!this.model) {
            return {required: true};
        }

        return undefined;
    }

    /**
     * Propagates the changes to the parent form
     */
    public onChange() {
        this.model = !this.model;

        if (!this.propagateChange) {
            return;
        }
        this.propagateChange(this.model);
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
