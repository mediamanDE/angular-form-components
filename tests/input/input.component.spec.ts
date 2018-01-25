import { TestBed, ComponentFixture } from '@angular/core/testing';
import { InputComponent } from '../../src/input/input.component';
import { FormsModule, NgModel, FormControl } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
    let fixture: ComponentFixture<InputComponent>;
    let component: InputComponent;
    let inputElement: DebugElement;
    let inputModel: NgModel;
    let propagateChangeFn: Function;
    let propagateTouchedFn: Function;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [InputComponent],
            imports: [FormsModule]
        });
    });
    
    beforeEach(() => {
        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        inputElement = fixture.debugElement.query(By.css('input'));
        inputModel = inputElement.injector.get(NgModel);

        propagateChangeFn = jasmine.createSpy('propagateChangeFn');
        propagateTouchedFn = jasmine.createSpy('propagateTouchedFn');
    });

    describe('::writeValue', () => {
       it('should set the internal value', () => {
           const newValue = 'foo';

           component.writeValue(newValue);

           expect(component.value).toBe(newValue);
       });
    });

    describe('::validate', () => {
        it('should proxy the input errors', () => {
            component.required = true;

            fixture.detectChanges();
            inputModel.control.markAsTouched();

            const errors = component.validate(new FormControl());

            expect(errors).toEqual({required: true});
        });

        it('should perform no validation if the input was never touched', () => {
            component.required = true;

            fixture.detectChanges();

            const errors = component.validate(new FormControl());

            expect(errors).toBeUndefined();
        });
    });

    describe('::onChange', () => {
        it('should propagate the change to the parent form', () => {
            const newValue = 'foo';

            component.registerOnChange(propagateChangeFn);

            component.writeValue(newValue);
            component.onChange();

            expect(propagateChangeFn).toHaveBeenCalledWith(newValue);
        });
    });

    describe('::onBlur', () => {
        it('should mark the input as touched for the parent form', () => {
            component.registerOnTouched(propagateTouchedFn);

            component.onBlur();

            expect(propagateTouchedFn).toHaveBeenCalled();
        });
    });
});
