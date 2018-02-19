import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { AbstractFormControl } from '../src/abtract-form-control';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, FormControl, AbstractControl } from '@angular/forms';

@Component({
    selector: 'test-component',
    template: ''
})
class ConcreteFormControlComponent extends AbstractFormControl {
    public name: string = 'foo';
}

describe('AbstractFormControl', () => {
    let fixture: ComponentFixture<ConcreteFormControlComponent>;
    let component: AbstractFormControl;
    let controlContainer: ControlContainer;
    let formControl: FormControl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ConcreteFormControlComponent],
            providers: [
                {provide: ControlContainer, useValue: {control: {get: () => null}}}
            ]
        });
    });

    beforeEach(inject([ControlContainer], (_controlContainer: ControlContainer) => {
        fixture = TestBed.createComponent(ConcreteFormControlComponent);
        component = fixture.componentInstance;
        controlContainer = _controlContainer;

        formControl = new FormControl();

        spyOn((controlContainer.control as AbstractControl), 'get').and.returnValue(formControl);
    }));

    describe('::ngOnInit', () => {
        it('should get the form control instance', (done) => {
            component.ngOnInit();

            setTimeout(() => {
                expect((controlContainer.control as AbstractControl).get).toHaveBeenCalledWith(component.name);
                expect(component.control).toBe(formControl);

                done();
            });
        });

        it('should trigger change detection if the form control value changes', (done) => {
            const changeDetectorRef: ChangeDetectorRef = (component['changeDetectorRef'] as ChangeDetectorRef);
            let valueChangesCb: Function;

            spyOn(changeDetectorRef, 'markForCheck');
            spyOn(formControl.valueChanges, 'subscribe').and.callFake((cb: Function) => valueChangesCb = cb);

            component.ngOnInit();

            setTimeout(() => {
                valueChangesCb(null);

                expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
                done();
            });
        });
    });
});
