import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ToggleComponent } from '../../src/toggle/toggle.component';
import { FormsModule, NgModel, FormControl } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ToggleComponent', () => {
    let fixture: ComponentFixture<ToggleComponent>;
    let component: ToggleComponent;
    let propagateChangeFn: Function;
    let propagateTouchedFn: Function;
    let inputElement: DebugElement;
    let inputModel: NgModel;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ToggleComponent]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToggleComponent);
        component = fixture.componentInstance;
        inputElement = fixture.debugElement.query(By.css('input'));
        inputModel = inputElement.injector.get(NgModel);

        propagateChangeFn = jasmine.createSpy('propagateChangeFn');
        propagateTouchedFn = jasmine.createSpy('propagateTouchedFn');
    });

    describe('::writeValue', () => {
        it('should set the internal model', () => {
            component.writeValue(true);

            expect(component.model).toBe(true);
        });
    });

    describe('::validate', () => {
        it('should proxy the input errors', () => {
            component.required = true;

            let errors = component.validate(new FormControl());

            expect(errors).toEqual({required: true});

            component.model = true;
            errors = component.validate(new FormControl());

            expect(errors).toBeUndefined();
        });
    });

    describe('::onChange', () => {
        it('should propagate the change to the parent form', () => {
            component.registerOnChange(propagateChangeFn);

            component.onChange();

            expect(propagateChangeFn).toHaveBeenCalledWith(true);
        });

        it('should not propagate the change to the parent form if there is no change cb registered', () => {
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

