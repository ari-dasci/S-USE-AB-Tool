import { defineStore } from 'pinia';
import axios from 'axios';
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
            console.log(user);
            const formData = new FormData();
            formData.append("method", user.method);
            formData.append("firstname", user.firstname);
            formData.append("lastname", user.lastename);
            formData.append("password", user.password)
            formData.append("email",user.email)
            formData.append("organization", user.organization)
            formData.append("profilePhoto", user.profilePhoto)
          

            let resp =  await axios.post("https://lionware.dev/ari-dasci/webservice",formData)
            console.log(resp)
           
            // this.user = user;
        },
        async logout() {
            this.user = null;
        }
    },
    persist: true
});
