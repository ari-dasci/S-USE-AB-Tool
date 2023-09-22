import 'material-design-icons-iconfont/dist/material-design-icons.css';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';

import { aliases, md } from 'vuetify/iconsets/md';
import colors from 'vuetify/lib/util/colors';

import { VDataTable, VDataTableServer, VDataTableVirtual } from 'vuetify/labs/VDataTable';

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
    components: { ...components, VDataTable, VDataTableServer, VDataTableVirtual },
    directives,
    theme,
    icons
});
