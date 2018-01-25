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

## Components

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
| **required** | The required state of the rendered input element | true, false ||
| **pattern** | Regular expression the value is checked against. Type must be text, search, tel, url, email, or password | true, false ||
| **label** | The label for the input element | * ||