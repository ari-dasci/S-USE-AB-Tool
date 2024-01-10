import { defineStore } from 'pinia';
import axios from 'axios';
export const useCallService = defineStore('service', {
    state: () => ({
        project: null,
    }),
    actions: {
        async service(data) {

            let config = {
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  }
                }

            const formData = new FormData();
            for (const [key, value] of Object.entries(data)) {
                formData.append(`${key}`, value);
            }
          

            let resp =  await axios.post("https://lionware.dev/ari-dasci/webservice",formData);

            if(resp.status == 200) return resp.data;
            else alert("Lo sentimos, hubo un error")
        }
    }
});
