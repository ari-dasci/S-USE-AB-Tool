<script setup>

import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { reactive, ref } from 'vue';
import { useCallService } from '../stores/service';
import { useRouter } from 'vue-router';

const store = useCallService();
const isLoading = ref(false);
const router = useRouter();

const state = reactive({
    method:'system.login',
    username:'',
    password:''
});

const rules = {
    username: { required, email },
    password: { required }
};

const v$ = useVuelidate(rules, state);

const enviar = async () => {
    try {
        const result = await v$.value.$validate();
        if (!result) {
            console.log("hubo un error")
            // notify user form is invalid
            return;
        }
        isLoading.value = true;

        const data = {
            "method": state.method,
            "username": state.username,
            "password": state.password
        }

        let response = await store.service(data);
        //correo@correo.com
        //1234
        if(response.status == 'error') alert(`${response.message}`);
        if(response.status == 'success') router.push('/Home');
    } finally {
        isLoading.value = false;
    }
};

</script>

<template>
<v-container>
    <v-row align="center" justify="center">
    <v-col cols="5">
        <v-card title="LOGIN" class=" d-flex flex-column align-stretch rounded-lg" :loading="isLoading" >

       
        <v-card-text>
        <v-row>
        <v-col>
            <v-text-field 
                label="Email" 
                type="text"
                v-model="state.username" 
                color="blue-grey"
                :error-messages="v$.username.$errors.map(e => e.$message)"
                >
            </v-text-field>
            <v-text-field 
                label="Password" 
                type="password"
                color="blue-grey"
                v-model="state.password"
                :error-messages="v$.password.$errors.map(e => e.$message)"
                >
            </v-text-field> 
            <p class="errorMessage">{{state.errorMessage}}</p>
            </v-col>
            </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="blue-grey darken-1"
                @click="enviar()"
                dark 
                :loading="isLoading"
                >Login</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
  
            <v-card-text class="text-center">
                ¿No tienes una cuenta?
                <router-link to="/sign-up">Regístrate</router-link>
            </v-card-text>
        </v-card>
        </v-col>
    </v-row>
    </v-container>
</template>