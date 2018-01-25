import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SelectComponent } from '../../src/select/select.component';
import { DebugElement } from '@angular/core';
import { NgModel, FormControl, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SelectComponent', () => {
    let fixture: ComponentFixture<SelectComponent>;
    let component: SelectComponent;
    let selectElement: DebugElement;
    let selectModel: NgModel;
    let propagateChangeFn: Function;
    let propagateTouchedFn: Function;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SelectComponent],
            imports: [FormsModule]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectComponent);
        component = fixture.componentInstance;
        selectElement = fixture.debugElement.query(By.css('select'));
        selectModel = selectElement.injector.get(NgModel);

        propagateChangeFn = jasmine.createSpy('propagateChangeFn');
        propagateTouchedFn = jasmine.createSpy('propagateTouchedFn');
    });

    it('should render the options correctly', () => {
        component.options = [
            {
                value: '1',
                label: 'foo'
            },
            {
                value: '2',
                label: 'bar'
            }
        ];

        fixture.detectChanges();

        const optionElements = fixture.debugElement.queryAll(By.css('option'));

        expect((<HTMLOptionElement> optionElements[0].nativeElement).value).toBe('1');
        expect((<HTMLOptionElement> optionElements[1].nativeElement).value).toBe('2');
    });

    describe('::writeValue', () => {
        it('should set the internal value', () => {
            const newValue = 'foo';

            component.writeValue(newValue);

            expect(component.value).toBe(newValue);
        });
    });

    describe('::validate', () => {
        it('should proxy the select errors', () => {
            component.required = true;

            fixture.detectChanges();
            selectModel.control.markAsTouched();

            const errors = component.validate(new FormControl());

            expect(errors).toEqual({required: true});
        });

        it('should perform no validation if the select was never touched', () => {
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
        it('should mark the select as touched for the parent form', () => {
            component.registerOnTouched(propagateTouchedFn);

            component.onBlur();

            expect(propagateTouchedFn).toHaveBeenCalled();
        });
    });
});
