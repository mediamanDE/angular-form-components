# angular-form-components

> Angular library of common, un-styled form components.

[![Build Status](https://travis-ci.org/mediamanDE/angular-form-components.svg?branch=master)](https://travis-ci.org/mediamanDE/angular-form-components)
[![npm version](https://badge.fury.io/js/%40mediaman%2Fangular-form-components.svg)](https://badge.fury.io/js/%40mediaman%2Fangular-form-components)

## Installation

```bash
npm install --save @mediaman/angular-form-components
```

## Importing library

You need to import the module in your application:

```javascript
import { NgModule } from '@angular/core';
import { AngularFormComponentsModule } from '@mediaman/angular-form-components';

@NgModule({
    imports: [AngularFormComponentsModule]
});
export class AppModule {
}
```

### Enabling XSRF support

You can enable xsrf support to protect your form API agains cross domain forgery by providing an API endpoint to set the XSRF token.

```javascript
import { NgModule } from '@angular/core';
import { AngularFormComponentsModule } from '@mediaman/angular-form-components';

@NgModule({
    imports: [AngularFormComponentsModule.forRoot({xsrfApiUrl: 'http://example.com/api/v1/csrf'})]
});
export class AppModule {
}
```

## Components

We've also added a [demo](https://mediamande.github.io/angular-form-components/index.html) of the 
unstyled components with their respective documentation.

### Input field

The `mm-input` component can represent all HTML input fields where a value can be entered.

```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'contact-form',
    template: `<mm-input [name]="'name'"
                    [id]="'name'"
                    [required]="true"
                    [(ngModel)]="name"
                    [label]="'Your name'"></mm-input>`
})
export class ContactFormComponent {
    public name: string = '';
}
```

#### Properties

| **name** | description | possible values | default value |
|----------|-------------|-----------------|---------------|
| **type** | The type of the rendered input element | text, search, number, email, ... | text |
| **name** | The name of the rendered input element | * ||
| **id** | The id of the rendered input element | * ||
| **required** | The required state of the rendered input element | true, false | false |
| **pattern** | Regular expression the value is checked against. Type must be text, search, tel, url, email, or password | true, false ||
| **label** | The label for the input element | * ||

### Select

The `mm-select` component represents a HTML select field.

```javascript
import { Component } from '@angular/core';
import { SelectOptionInterface } from '@mediaman/angular-form-components';

@Component({
    selector: 'contact-form',
    template: `<mm-select [name]="'gender'"
                    [id]="'gender'"
                    [options]="genderOptions"
                    [required]="true"
                    [(ngModel)]="gender"
                    [label]="'Your gender'"></mm-select>`
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
            label: 'I don\'t care'
        },
    ];
}
```

#### Properties

| **name** | description | possible values | default value |
|----------|-------------|-----------------|---------------|
| **name** | The name of the rendered select element | * ||
| **id** | The id of the rendered select element | * ||
| **options** | The select elements options | SelectOptionInterface[] | [] |
| **required** | The required state of the rendered select element | true, false | false |
| **label** | The label for the select element | * ||

### Radio button

The `mm-radio-button` component represents a HTML radio button.

The `mm-radio-button` component should be used, if possible, in combination with the `mm-radio-button-group` component.

```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'contact-form',
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
    `
})
export class ContactFormComponent {
    public contactPossibility: string = '';
}
```

### Checkbox

The `mm-checkbox` component represents a HTML checkbox.

```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'contact-form',
    template: `
        <mm-checkbox [id]="'newsletterDoc'"
            [label]="'I want to get the newsletter'"
            [checked]="newsletterDoc"
            (change)="newsletterDoc = !newsletterDoc"></mm-checkbox>
        <mm-checkbox [id]="'emailDoc'"
            [label]="'It is okay for me to get contacted via email'"
            [checked]="emailDoc"
            (change)="emailDoc = !emailDoc"></mm-checkbox>
    `
})
export class ContactFormComponent {
    public newsletterDoc: boolean;
    public emailDoc: boolean;
}
```

#### Properties

| **name** | description | possible values | default value |
|----------|-------------|-----------------|---------------|
| **name** | The name of the rendered radio button element | * ||
| **id** | The id of the rendered radio button element | * ||
| **value** | The value of the rendered datio button element | * ||
| **required** | The required state of the rendered radio button element | true, false | false |
| **label** | The label for the radio button element | * ||

### Toggle

The `mm-toggle` component represents a simple toggle element with a hidden checkbox used to store the state.

```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'contact-form',
    template: `
        <mm-toggle [name]="'privacy'"
                  [id]="'privacy'"
                  [label]="'I accept the terms of usage.'"
                  [required]="true"
                  [(ngModel)]="privacyAccepted"></mm-toggle>
    `
})
export class ContactFormComponent {
    public privacyAccepted: boolean = false;
}
```

#### Properties

| **name** | description | possible values | default value |
|----------|-------------|-----------------|---------------|
| **name** | The name of the rendered toggle element | * ||
| **id** | The id of the rendered toggle element | * ||
| **required** | The required state of the rendered toggle element | true, false | false |
| **label** | The label for the toggle element | * ||
