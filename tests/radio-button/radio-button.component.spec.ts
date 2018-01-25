import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RadioButtonComponent } from '../../src/radio-button/radio-button.component';
import { FormsModule, NgModel, FormControl } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('RadioButtonComponent', () => {
    let fixture: ComponentFixture<RadioButtonComponent>;
    let component: RadioButtonComponent;
    let radioButtonElement: DebugElement;
    let radioButtonModel: NgModel;
    let propagateChangeFn: Function;
    let propagateTouchedFn: Function;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RadioButtonComponent],
            imports: [FormsModule]
        });
    });
    
    beforeEach(() => {
        fixture = TestBed.createComponent(RadioButtonComponent);
        component = fixture.componentInstance;
        radioButtonElement = fixture.debugElement.query(By.css('input'));
        radioButtonModel = radioButtonElement.injector.get(NgModel);

        propagateChangeFn = jasmine.createSpy('propagateChangeFn');
        propagateTouchedFn = jasmine.createSpy('propagateTouchedFn');
    });

    describe('::writeValue', () => {
       it('should set the internal model', () => {
           const newModelValue = 'foo';

           component.writeValue(newModelValue);

           expect(component.model).toBe(newModelValue);
       });
    });

    describe('::validate', () => {
        it('should proxy the input errors', () => {
            component.required = true;

            fixture.detectChanges();
            radioButtonModel.control.markAsTouched();

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

            component.value = newValue;
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
