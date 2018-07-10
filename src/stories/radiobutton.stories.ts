import { storiesOf } from '@storybook/angular';
import { withMarkdownNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import { RadioButtonComponent } from '../radio-button/radio-button.component';

storiesOf('Radio Button', module)
    .add('Basic Unchecked', withMarkdownNotes(`
### Radio button

The \`mm-radio\` component represents a HTML radio button.

The \`mm-radio\` component should be used, if possible, in combination with the \`mm-radio-group\` component.

~~~js
import { Component } from '@angular/core';

@Component({
    selector: 'contact-form',
    template: \`
        <mm-radio-group [name]="'contactPossibility'" [required]="true" [(ngModel)]="contactPossibility">
            <mm-radio-button [id]="'contactPossibilityPhone'"
                [value]="'phone'"
                [label]="'Phone'"></mm-radio-button>
            <mm-radio-button [id]="'contactPossibilityEmail'"
                [value]="'email'"
                [label]="'E-Mail'"></mm-radio-button>
        </mm-radio-group>
    \`
})
export class ContactFormComponent {
    public contactPossibility: string = '';
}
~~~

#### Properties

| **name** | description | possible values | default value |
|----------|-------------|-----------------|---------------|
| **name** | The name of the rendered radio button element | * ||
| **id** | The id of the rendered radio button element | * ||
| **value** | The value of the rendered datio button element | * ||
| **required** | The required state of the rendered radio button element | true, false | false |
| **label** | The label for the radio button element | * ||
    `)(() => ({
        component: RadioButtonComponent,
        props: {
            label: 'Radio Button Label'
        },
    })))
    .add('Checked', withMarkdownNotes(`
### Radio button

Radio button when checked.
    `)(() => ({
        component: RadioButtonComponent,
        props: {
            checked: 'checked',
            label: 'Radio Button Label',
            required: true
        },
    })));
