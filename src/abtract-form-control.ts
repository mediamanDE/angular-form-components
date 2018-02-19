import { AbstractControl, ControlContainer } from '@angular/forms';
import { ChangeDetectorRef, OnInit, Inject } from '@angular/core';

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
            this.control = (this.controlContainer.control as AbstractControl).get(this.name) as AbstractControl;
            this.control.valueChanges.subscribe(() => this.changeDetectorRef.markForCheck());
        });
    }
}
