import { configure, addDecorator } from '@storybook/angular';
import { setOptions } from '@storybook/addon-options';
import { withNotes } from '@storybook/addon-notes';

// Option defaults:
setOptions({
    /**
     * name to display in the top left corner
     * @type {String}
     */
    name: 'angular-form-components',
    /**
     * URL for name in top left corner to link to
     * @type {String}
     */
    url: 'https://github.com/mediamanDE/angular-form-components',
    /**
     * show story component as full screen
     * @type {Boolean}
     */
    goFullScreen: false,
    /**
     * display panel that shows a list of stories
     * @type {Boolean}
     */
    showStoriesPanel: true,
    /**
     * display panel that shows addon configurations
     * @type {Boolean}
     */
    showAddonPanel: true,
    /**
     * display floating search box to search through stories
     * @type {Boolean}
     */
    showSearchBox: false,
    /**
     * show addon panel as a vertical panel on the right
     * @type {Boolean}
     */
    addonPanelInRight: true,
    /**
     * id to select an addon panel
     * @type {String}
     */
    selectedAddonPanel: undefined, // The order of addons in the "Addon panel" is the same as you import them in 'addons.js'. The first panel will be opened by default as you run Storybook
});

addDecorator(withNotes);

// automatically import all files ending in *.stories.ts
const req = require.context('../src/stories', true, /.stories.ts$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
