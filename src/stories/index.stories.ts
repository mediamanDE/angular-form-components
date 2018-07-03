import { storiesOf } from '@storybook/angular';
import { withInfo } from '@storybook/addon-info';
import { withMarkdownNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { RadioButtonGroupComponent } from '../radio-button/radio-button-group.component';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { ToggleComponent } from '../toggle/toggle.component';

storiesOf('Input', module)
    .add('Basic', withMarkdownNotes(`
# Hello World

This is some code showing usage of the component and other inline documentation

~~~js
<div>
  hello world!
  <Component/>
</div>
~~~
    `)(() => ({
        component: InputComponent,
        props: {
            label: 'Text Input Label',
            value: 'hi ho',
            errorMessage: 'This is an error message'
        },
    })))

storiesOf('Radio Button', module)
    .add('Basic Unchecked', withMarkdownNotes(`
# Hello World

This is some code showing usage of the component and other inline documentation

~~~js
<div>
  hello world!
  <Component/>
</div>
~~~
    `)(() => ({
        component: RadioButtonComponent,
        props: {
            label: 'Radio Button Label'
        },
    })))
    .add('Checked Required', () => ({
        component: RadioButtonComponent,
        props: {
            checked: 'checked',
            label: 'Radio Button Label',
            required: true
        },
    }))

storiesOf('Radio Button Group', module)
    .add('Basic', () => ({
        component: RadioButtonGroupComponent,
        props: {},
    }))

storiesOf('Select', module)
    .add('Basic', () => ({
        component: SelectComponent,
        props: {
            label: 'Select Label',
            options: [{ value: '1', label: 'option 1'}, { value: '2', label: 'option 2'}]
        },
    }))


storiesOf('Toggle', module)
    .add('Basic', () => ({
        component: ToggleComponent,
        props: {},
    }));
