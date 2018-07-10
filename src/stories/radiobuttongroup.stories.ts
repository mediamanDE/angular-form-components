import { storiesOf } from '@storybook/angular';
import { withMarkdownNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import { RadioButtonGroupComponent } from '../radio-button/radio-button-group.component';

storiesOf('Radio Button Group', module)
    .add('Basic', withMarkdownNotes(`
### Radio button group
    `)(() => ({
        component: RadioButtonGroupComponent,
        props: {},
    })));
