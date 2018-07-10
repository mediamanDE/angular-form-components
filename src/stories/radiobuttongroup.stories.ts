import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';

import { RadioButtonGroupComponent } from '../radio-button/radio-button-group.component';

const documentation = `
### Radio button group
`;

storiesOf('Radio Button Group', module)
    .add('Basic', () => ({
        component: RadioButtonGroupComponent,
        props: {},
    }),
    { notes: {
        markdown: documentation
    }});
