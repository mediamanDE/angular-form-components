import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RadioButtonGroupComponent } from '../../src/radio-button/radio-button-group.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, FormControl } from '@angular/forms';
import { RadioButtonComponent } from '../../src/radio-button/radio-button.component';

@Component({
    selector: 'mm-radio-button-group-test',
    template: `
        <mm-radio-button-group>
            <mm-radio-button
                [id]="'fooOne'"
                [value]="'1'"
                [(ngModel)]="foo"></mm-radio-button>
            <mm-radio-button
                [id]="'fooTwo'"
                [value]="'2'"
                [(ngModel)]="foo"></mm-radio-button>
        </mm-radio-button-group>
    `
})
class RadioButtonGroupTestComponent {
    public foo: string;
}

describe('RadioButtonGroupComponent', () => {
    let fixture: ComponentFixture<RadioButtonGroupTestComponent>;
    let component: RadioButtonGroupComponent;
    let radioButtons: RadioButtonComponent[];
    let propagateChangeFn: Function;
    let propagateTouchedFn: Function;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                RadioButtonGroupTestComponent,
                RadioButtonGroupComponent,
                RadioButtonComponent
            ],
            imports: [FormsModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioButtonGroupTestComponent);
        fixture.detectChanges();

        const componentFixture = fixture.debugElement.query(By.directive(RadioButtonGroupComponent));
        component = componentFixture.injector.get(RadioButtonGroupComponent);
        radioButtons = componentFixture.queryAll(By.directive(RadioButtonComponent))
            .map((el: DebugElement) => el.injector.get(RadioButtonComponent));

        propagateChangeFn = jasmine.createSpy('propagateChangeFn');
        propagateTouchedFn = jasmine.createSpy('propagateTouchedFn');
    });

    describe('::name', () => {
        const newName = 'foo';

        it('should set the children radio buttons name attributes', () => {
            component.name = newName;

            expect(radioButtons[0].name).toBe(newName);
            expect(radioButtons[1].name).toBe(newName);
        });

        it('should not set the children radio buttons name attributes if there are none', () => {
            Object.defineProperty(component, 'radioButtons', {value: null});

            component.name = newName;

            expect(radioButtons[0].name).not.toBe(newName);
            expect(radioButtons[1].name).not.toBe(newName);
        });
    });

    describe('::value', () => {
        const newValue = 'foo';

        it('should set the internal value property', () => {
            component.value = newValue;

            expect(component.value).toBe(newValue);
        });

        it('should propagate the change to the parent form', () => {
            component.registerOnChange(propagateChangeFn);

            component.value = newValue;

            expect(propagateChangeFn).toHaveBeenCalledWith(newValue);
        });

        it('should not propagate the change to the parent form if there is no change cb registered', () => {
            component.value = newValue;

            expect(propagateChangeFn).not.toHaveBeenCalled();
        });
    });

    describe('::writeValue', () => {
        const newValue = 'phone';

        it('should set the internal value', () => {
            component.writeValue(newValue);

            expect(component.value).toBe(newValue);
        });

        it('should set the models of the radio button children', () => {
            component.writeValue(newValue);

            expect(radioButtons[0].model).toBe(newValue);
            expect(radioButtons[1].model).toBe(newValue);
        });

        it('should not set the models of the radio button children if there are none', () => {
            Object.defineProperty(component, 'radioButtons', {value: null});

            component.writeValue(newValue);

            expect(radioButtons[0].model).not.toBe(newValue);
            expect(radioButtons[1].model).not.toBe(newValue);
        });
    });

    describe('::registerOnTouched', () => {
        beforeEach(() => {
            spyOn(radioButtons[0], 'registerOnTouched');
            spyOn(radioButtons[1], 'registerOnTouched');
        });

        it('should register the touched events on the radio button children', () => {
            component.registerOnTouched(propagateTouchedFn);

            expect(radioButtons[0].registerOnTouched).toHaveBeenCalledWith(propagateTouchedFn);
            expect(radioButtons[1].registerOnTouched).toHaveBeenCalledWith(propagateTouchedFn);
        });

        it('should not register the touched events on the radio button children if there are none', () => {
            Object.defineProperty(component, 'radioButtons', {value: null});

            component.registerOnTouched(propagateTouchedFn);

            expect(radioButtons[0].registerOnTouched).not.toHaveBeenCalled();
            expect(radioButtons[1].registerOnTouched).not.toHaveBeenCalled();
        });
    });

    describe('::validate', () => {
        it('should return a required error if no radio button is selected', () => {
            radioButtons[0].checked = false;
            radioButtons[1].checked = false;

            const errors = component.validate(new FormControl());

            expect(errors).toEqual({required: true});
        });

        it('should not return a required error if no radio button is selected', () => {
            radioButtons[0].checked = true;

            const errors = component.validate(new FormControl());

            expect(errors).toBeUndefined();
        });

        it('should not return an error if there are no child radio buttons', () => {
            Object.defineProperty(component, 'radioButtons', {value: null});

            const errors = component.validate(new FormControl());

            expect(errors).toBeUndefined();
        });
    });
});
