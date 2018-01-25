# angular-form-components

> Angular library of common, un-styled form components.

[![Build Status](https://travis-ci.org/mediamanDE/angular-form-components.svg?branch=master)](https://travis-ci.org/mediamanDE/angular-form-components)

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