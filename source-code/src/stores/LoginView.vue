<script setup>

import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { reactive, ref } from 'vue';
import { useCallService } from '../stores/service'
const store = useCallService();
const isLoading = ref(false);

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
        console.log("deberia hacer login");
        await store.service(state);
    } finally {
        isLoading.value = false;
    }
};

</script>

<template>
 <v-container>
    <v-row align="center" justify="center">
    <v-col cols="5">
    <!-- <v-form class="ma-2" @submit.prevent="enviar"> -->
        <v-card class="elevation-12" :loading="isLoading"    >
        <v-toolbar dense dark color="blue-grey">
            <v-spacer></v-spacer>
            <v-toolbar-title class="text-md-center"></v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
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
                <v-btn type="submit"
                color="blue-grey darken-1"
                @click="enviar()"
                dark 
                :loading="isLoading"
                >Login</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
            </v-card>
        <!-- </v-form> -->
        <v-card flat>
            <v-card-text class="text-center">
                ¿No tienes una cuenta?
                <router-link to="/sign-up">Regístrate</router-link>
            </v-card-text>
        </v-card>
        </v-col>
    </v-row>
 </v-container>
</template>

