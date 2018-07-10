import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withMarkdownNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { RadioButtonGroupComponent } from '../radio-button/radio-button-group.component';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { ToggleComponent } from '../toggle/toggle.component';
import { NgForm } from '@angular/forms';

storiesOf('Input', module)
    .addDecorator(moduleMetadata({providers: [NgForm]}))
    .add('Basic', withMarkdownNotes(`
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
    `)(() => ({
        component: InputComponent,
        props: {
            label: 'Text Input Label',
            errorMessage: 'This is an error message'
        },
    })));

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
    .add('Checked Required', withMarkdownNotes(`
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

storiesOf('Radio Button Group', module)
    .add('Basic', withMarkdownNotes(`
### Radio button group
    `)(() => ({
        component: RadioButtonGroupComponent,
        props: {},
    })));

storiesOf('Select', module)
    .add('Basic', withMarkdownNotes(`
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
    `)(() => ({
        component: SelectComponent,
        props: {
            label: 'Select Label',
            options: [{ value: '1', label: 'option 1'}, { value: '2', label: 'option 2'}]
        },
    })));


storiesOf('Toggle', module)
    .add('Basic', withMarkdownNotes(`
### Toggle

The \`mm-toggle\` component represents a simple toggle element with a hidden checkbox used to store the state.

~~~js
import { Component } from '@angular/core';

@Component({
    selector: 'contact-form',
    template: \`
        <mm-toggle [name]="'privacy'"
                  [id]="'privacy'"
                  [label]="'I accept the terms of usage.'"
                  [required]="true"
                  [(ngModel)]="privacyAccepted"></mm-toggle>
    \`
})
export class ContactFormComponent {
    public privacyAccepted: boolean = false;
}
~~~

#### Properties

| **name** | description | possible values | default value |
|----------|-------------|-----------------|---------------|
| **name** | The name of the rendered toggle element | * ||
| **id** | The id of the rendered toggle element | * ||
| **required** | The required state of the rendered toggle element | true, false | false |
| **label** | The label for the toggle element | * ||
    `)(() => ({
        component: ToggleComponent,
        props: {},
    })));
