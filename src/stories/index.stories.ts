import { storiesOf } from '@storybook/angular';
import { withInfo } from '@storybook/addon-info';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { RadioButtonGroupComponent } from '../radio-button/radio-button-group.component';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { ToggleComponent } from '../toggle/toggle.component';

storiesOf('Generic Form Components', module)
    .add('InputComponent', () => ({
        component: InputComponent,
        props: {},
    }))
    .add('RadioButtonComponent', () => ({
        component: RadioButtonComponent,
        props: {
            label: 'radio button label'
        },
    }))
    .add('RadioButtonComponent checked required', () => ({
        component: RadioButtonComponent,
        props: {
            checked: 'checked',
            label: 'radio button label',
            required: true
        },
    }))
    .add('RadioButtonGroupComponent', () => ({
        component: RadioButtonGroupComponent,
        props: {},
    }))
    .add('SelectComponent', () => ({
        component: SelectComponent,
        props: {},
    }))
    .add('ToggleComponent', () => ({
        component: ToggleComponent,
        props: {},
    }));
