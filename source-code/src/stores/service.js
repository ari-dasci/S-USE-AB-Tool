import { defineStore } from 'pinia';
import axios from 'axios';
export const useCallService = defineStore('service', {
    state: () => ({
        project: null,
    }),
    actions: {
        async service(data) {
            console.log(data);
            let config = {
                headers: {
                  "status": 200,
                  "Content-Type": "application/json",
                  'Access-Control-Allow-Origin': '*',
                  }
                }
            await axios.post('https://lionware.dev/ari-dasci/webservice',
            data, config)
            .then(res => {
                console.log(res.data);
                
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
});
