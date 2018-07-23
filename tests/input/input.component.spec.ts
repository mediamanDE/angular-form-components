import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from '../../src/input/input.component';
import { ControlContainer, FormControl, FormsModule, NgForm, NgModel } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
    let fixture: ComponentFixture<InputComponent>;
    let component: InputComponent;
    let propagateChangeFn: Function;
    let propagateTouchedFn: Function;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [InputComponent],
            imports: [FormsModule],
            providers: [
                {provide: ControlContainer, useValue: {controls: {value: {get: () => new FormControl()}}}},
                NgForm
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;


        propagateChangeFn = jasmine.createSpy('propagateChangeFn');
        propagateTouchedFn = jasmine.createSpy('propagateTouchedFn');

        component.name = 'fistName';
    });

    describe('::writeValue', () => {
        it('should set the internal value', () => {
            const newValue = 'foo';

            component.writeValue(newValue);

            expect(component.value).toBe(newValue);
        });
    });

    describe('::validate', () => {
        it('should proxy the input errors', (done) => {
            component.required = true;

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const inputElement = fixture.debugElement.query(By.directive(NgModel));
                const inputModel = inputElement.injector.get(NgModel);

                inputModel.control.markAsTouched();

                const errors = component.validate(new FormControl());

                expect(errors).toEqual({required: true});
                done();
            });
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

        it('should not propagate the change to the parent form if there is no handler', () => {
            const newValue = 'foo';

            component.writeValue(newValue);
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

        it('should not mark the input as touched for the parent form if there is no handler', () => {
            component.onBlur();

            expect(propagateTouchedFn).not.toHaveBeenCalled();
        });
    });

    describe('::focus', () => {
        it('should bring focus to the input element', (done) => {
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const inputElement = fixture.debugElement.query(By.css('input'));
                spyOn(inputElement.nativeElement, 'focus');

                component.focus();

                expect(inputElement.nativeElement.focus).toHaveBeenCalled();

                done();
            });
        });
    });

    describe('::onFocus', () => {
        it('should mark the input as touched for the parent form', () => {
            const event = new Event('focus');

            spyOn(component.focused, 'emit');

            component.onFocus(event);

            expect(component.focused.emit).toHaveBeenCalledWith(event);
        });
    });
});
