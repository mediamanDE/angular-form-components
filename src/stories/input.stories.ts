import { moduleMetadata, storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';

import { InputComponent } from '../input/input.component';
import { NgForm } from '@angular/forms';

const documentation = `
### Input field

The \`mm-input\` component can represent all HTML input fields where a value can be entered.

~~~js
import { Component } from '@angular/core';

@Component({
    selector: 'contact-form',
    template: \`<mm-input [name]="'name'"
                    [id]="'name'"
                    [required]="true"
                    [(ngModel)]="name"
                    [label]="'Your name'"></mm-input>\`
})
export class ContactFormComponent {
    public name: string = '';
}
~~~

#### Properties

| **name** | description | possible values | default value |
|----------|-------------|-----------------|---------------|
| **type** | The type of the rendered input element | text, search, number, email, ... | text |
| **name** | The name of the rendered input element | * ||
| **id** | The id of the rendered input element | * ||
| **required** | The required state of the rendered input element | true, false | false |
| **pattern** | Regular expression the value is checked against. Type must be text, search, tel, url, email, or password | true, false ||
| **label** | The label for the input element | * ||
`;

storiesOf('Input', module)
    .addDecorator(moduleMetadata({providers: [NgForm]}))
    .add('Basic', () => ({
        component: InputComponent,
        props: {
            label: 'Text Input Label',
            errorMessage: 'This is an error message'
        },
    }),
    { notes: {
        markdown: documentation
    }});
