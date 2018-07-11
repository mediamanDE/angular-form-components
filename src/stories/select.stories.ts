import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';

import { SelectComponent } from '../select/select.component';

const documentation = `
### Select

The \`mm-select\` component represents a HTML select field.

~~~js
import { Component } from '@angular/core';
import { SelectOptionInterface } from '@mediaman/angular-form-components';

@Component({
    selector: 'contact-form',
    template: \`<mm-select [name]="'gender'"
                    [id]="'gender'"
                    [options]="genderOptions"
                    [required]="true"
                    [(ngModel)]="gender"
                    [label]="'Your gender'"></mm-select>\`
})
export class ContactFormComponent {
    public gender: string = '';
    public genderOptions: SelectOptionInterface[] = [
        {
            value: 'female',
            label: 'Female'
        },
        {
            value: 'male',
            label: 'Male'
        },
        {
            value: 'x',
            label: 'I don\\'t care'
        },
    ];
}
~~~

#### Properties

| **name** | description | possible values | default value |
|----------|-------------|-----------------|---------------|
| **name** | The name of the rendered select element | * ||
| **id** | The id of the rendered select element | * ||
| **options** | The select elements options | SelectOptionInterface[] | [] |
| **required** | The required state of the rendered select element | true, false | false |
| **label** | The label for the select element | * ||
`;

storiesOf('Select', module)
    .add('Basic', () => ({
        component: SelectComponent,
        props: {
            label: 'Select Label',
            options: [{ value: '1', label: 'option 1'}, { value: '2', label: 'option 2'}]
        },
    }),
    { notes: {
        markdown: documentation
    }});
