import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null
    }),
    getters: {
        isAuthenticated: state => !!state.user,
        userFullName: state => state.user && `${state.user.name} ${state.user.surname}`
    },
    actions: {
        async register(user) {
            await new Promise(resolve => {
                setTimeout(resolve, 2000);
            });
            this.user = user;
        },
        async logout() {
            this.user = null;
        }
    },
    persist: true
});
