import './assets/main.css';

import { createApp } from 'vue';

import App from './App.vue';
import pinia from './plugins/pinia';
import vuetify from './plugins/vuetify';
import router from './router';

const app = createApp(App);

app.use(vuetify);
app.use(pinia);
app.use(router);

app.mount('#app');
