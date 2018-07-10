import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';

import { RadioButtonGroupComponent } from '../radio-button/radio-button-group.component';
import { RadioButtonComponent } from '../radio-button/radio-button.component';

const documentation = `
### Radio button group

The \`mm-radio-button\` component should be used, if possible, in combination with the \`mm-radio-button-group\` component.

~~~js
import { Component } from '@angular/core';

@Component({
    selector: 'contact-form',
    template: \`
        <mm-radio-button-group [name]="'contactPossibility'"
            [required]="true"
            [(ngModel)]="contactPossibility">
            <mm-radio-button [id]="'contactPossibilityPhone'"
                [value]="'phone'"
                [label]="'Phone'"></mm-radio-button>
            <mm-radio-button [id]="'contactPossibilityEmail'"
                [value]="'email'"
                [label]="'E-Mail'"></mm-radio-button>
        </mm-radio-button-group>
    \`
})
export class ContactFormComponent {
    public contactPossibility: string = '';
}
~~~
`;

storiesOf('Radio Button Group', module)
    .add('Basic', () => ({
        template: `
<mm-radio-button-group [name]="'contactPossibility'"
    [required]="true"
    [(ngModel)]="contactPossibility">
    <mm-radio-button [id]="'contactPossibilityPhone'"
        [value]="'phone'"
        [label]="'Phone'"></mm-radio-button>
    <mm-radio-button [id]="'contactPossibilityEmail'"
        [value]="'email'"
        [label]="'E-Mail'"></mm-radio-button>
</mm-radio-button-group>
        `,
        moduleMetadata: {
            declarations: [RadioButtonGroupComponent, RadioButtonComponent]
        }
    }),
    { notes: {
        markdown: documentation
    }});
