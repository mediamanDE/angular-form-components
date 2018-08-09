import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RadioButtonComponent } from '../../src/radio-button/radio-button.component';
import { FormsModule, NgModel, FormControl } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RadioButtonGroupComponent } from '../../src/radio-button/radio-button-group.component';
import { inject } from '@angular/core/testing';

describe('RadioButtonComponent', () => {
    let fixture: ComponentFixture<RadioButtonComponent>;
    let component: RadioButtonComponent;
    let radioButtonGroupComponent: RadioButtonGroupComponent;
    let radioButtonElement: DebugElement;
    let radioButtonModel: NgModel;
    let propagateChangeFn: Function;
    let propagateTouchedFn: Function;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RadioButtonComponent],
            imports: [FormsModule],
            providers: [{provide: RadioButtonGroupComponent, useValue: {writeValue: () => null}}]
        });
    });
    
    beforeEach(inject([RadioButtonGroupComponent], (_radioButtonGroupComponent: RadioButtonGroupComponent) => {
        fixture = TestBed.createComponent(RadioButtonComponent);
        component = fixture.componentInstance;
        radioButtonGroupComponent = _radioButtonGroupComponent;
        radioButtonElement = fixture.debugElement.query(By.css('input'));
        radioButtonModel = radioButtonElement.injector.get(NgModel);

        propagateChangeFn = jasmine.createSpy('propagateChangeFn');
        propagateTouchedFn = jasmine.createSpy('propagateTouchedFn');
    }));

    describe('::ngOnInit', () => {
        it('should apply the parent radio button groups name property', () => {
            const newName = 'foo';

            radioButtonGroupComponent.name = newName;

            component.ngOnInit();

            expect(component.name).toBe(newName);
        });

        it('should not apply the parent radio button groups name property if it does not exist', () => {
            const newName = 'foo';

            Object.defineProperty(component, 'radioButtonGroup', {value: null});

            component.name = newName;
            component.ngOnInit();

            expect(component.name).toBe(newName);
        });
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

    describe('::model', () => {
        const newModel = 'foo';

        it('should set the internal model property', () => {
            component.model = newModel;

            expect(component.model).toBe(newModel);
        });

        it('should set the checked state correctly', () => {
            component.value = newModel;

            component.model = newModel;
            expect(component.checked).toBeTruthy();

            component.model = 'bar';
            expect(component.checked).toBeFalsy();
        });
    });

    describe('::required', () => {
        it('should get the internal required state', () => {
            component.required = true;
            radioButtonGroupComponent.required = false;

            expect(component.required).toBeTruthy();
        });

        it('should try to get the required state from the parent radio button group', () => {
            component.required = false;
            radioButtonGroupComponent.required = true;

            expect(component.required).toBeTruthy();
        });
    });

    describe('::onChange', () => {
        it('should update the parent radio button groups value', () => {
            spyOn(radioButtonGroupComponent, 'writeValue');

            const newValue = 'foo';

            component.value = newValue;
            component.onChange();

            expect(radioButtonGroupComponent.writeValue).toHaveBeenCalledWith(newValue);
        });

        it('should not update the parent radio button groups value if it does not exist', () => {
            const newValue = 'foo';

            Object.defineProperty(component, 'radioButtonGroup', {value: null});

            component.value = newValue;

            expect(() => component.onChange()).not.toThrow();
        });

        it('should propagate the change to the parent form', () => {
            const newValue = 'foo';

            component.registerOnChange(propagateChangeFn);

            component.value = newValue;
            component.onChange();

            expect(propagateChangeFn).toHaveBeenCalledWith(newValue);
        });

        it('should not propagate the change to the parent form if there is no change cb registered', () => {
            component.value = 'foo';
            component.onChange();

            expect(propagateChangeFn).not.toHaveBeenCalled();
        });
    });

    describe('::onBlur', () => {
        it('should mark the input as touched for the parent form', () => {
            component.registerOnTouched(propagateTouchedFn);

            component.onBlur();

            expect(propagateTouchedFn).toHaveBeenCalled();
        });

        it('should not mark the input as touched for the parent form if there is no touched cb registered', () => {
            component.onBlur();

            expect(propagateTouchedFn).not.toHaveBeenCalled();
        });
    });
});
