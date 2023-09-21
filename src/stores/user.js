import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null
    }),
    getters: {
        isLoggedIn: state => !!state.user,
        userFullName: state => state.user && `${state.user.name} ${state.user.surname}`
    },
    actions: {
        register(user) {
            this.user = user;
        },
        logout() {
            this.user = null;
        }
    },
    persist: true
});
