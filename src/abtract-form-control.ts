import { AbstractControl, ControlContainer, FormGroup, NgForm } from '@angular/forms';
import { ChangeDetectorRef, Inject, OnInit } from '@angular/core';

export abstract class AbstractFormControl implements OnInit {

    /**
     * The form controls name
     */
    public abstract name: string;

    /**
     * The underlying form control instance
     */
    public control: AbstractControl;

    /**
     * @param controlContainer
     * @param changeDetectorRef
     */
    public constructor(@Inject(ControlContainer) private controlContainer: ControlContainer,
                       @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef) {
    }

    /**
     * @inheritDoc
     */
    public ngOnInit() {
        setTimeout(() => {

            // We have to use this weird way to support deep-nested components, using model groups
            this.control = ((this.controlContainer as NgForm).controls.value as FormGroup)
                .get(this.name) as AbstractControl;
            this.control.valueChanges.subscribe(() => this.changeDetectorRef.markForCheck());
            this.changeDetectorRef.markForCheck();
        });
    }
}
