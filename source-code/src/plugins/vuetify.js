import 'material-design-icons-iconfont/dist/material-design-icons.css';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';

import { aliases, md } from 'vuetify/iconsets/md';
import colors from 'vuetify/lib/util/colors';

import { VDataTable, VDataTableServer, VDataTableVirtual } from 'vuetify/labs/VDataTable';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';
import {
    VStepper,
    VStepperActions,
    VStepperHeader,
    VStepperItem,
    VStepperWindow,
    VStepperWindowItem
} from 'vuetify/labs/VStepper';

const theme = {
    themes: {
        light: {
            dark: false,
            colors: {
                primary: colors.blue.darken4, // #E53935
                secondary: colors.blue.darken1 // #FFCDD2
            }
        }
    }
};

const icons = {
    defaultSet: 'md',
    aliases,
    sets: {
        md
    }
};

export default createVuetify({
    components: {
        ...components,
        VDataTable,
        VDataTableServer,
        VDataTableVirtual,
        VStepper,
        VStepperHeader,
        VStepperItem,
        VStepperActions,
        VStepperWindow,
        VStepperWindowItem,
        VSkeletonLoader
    },
    directives,
    theme,
    icons
});
