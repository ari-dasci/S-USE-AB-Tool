import { createPinia } from 'pinia';

const pinia = createPinia();
const dateRegexp = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

const dateReceiver = (key, value) => {
    if (dateRegexp.test(value)) {
        return new Date(value);
    }
    return value;
};

pinia.use(({ store, options }) => {
    if (!(options.persist || options.persist?.enable)) return;

    const key = store.$id;

    const savedState = localStorage.getItem(key);

    if (savedState) {
        const json = JSON.parse(savedState, dateReceiver);
        // if (options.persist?.from) {
        //     store.$patch(options.persist?.from(json));
        // } else {
        store.$patch(json);
        // }
    }

    store.$subscribe((mutation, state) => {
        localStorage.setItem(key, JSON.stringify(state));
    });
});

export default pinia;
