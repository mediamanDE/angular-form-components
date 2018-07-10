import { storiesOf } from '@storybook/angular';
import { withMarkdownNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import { ToggleComponent } from '../toggle/toggle.component';

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
