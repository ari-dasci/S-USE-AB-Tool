<script setup>
import useVuelidate from '@vuelidate/core';
import { email as emailValidator, required, sameAs } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { v4 as uuid } from 'uuid';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import ImgPickerComponent from '../components/ImgPickerComponent.vue';
import { useUserStore } from '../stores/user';

import { useCallService } from '../stores/service'

const store1 = useCallService();

const store = useUserStore();

const { user, isAuthenticated } = storeToRefs(store);

const isLoading = ref(false);

const router = useRouter();

const {
    id = uuid(),
    firstname = '',
    lastname = '',
    password = '',
    email = '',
    organization = '',
    profilePhoto = {img: null}
} = user.value ?? {};

const state = reactive({
    method: "system.profile.create",
    id,
    firstname,
    lastname,
    password: '',
    // confirmPassword: '',
    email,
    organization,
    profilePhoto,
});

const rules = {
    firstname: { required },
    lastname: { required },
    password: { required },
    // confirmPassword: { required, sameAs: sameAs('password') },
    email: { required, emailValidator },
    organization: { required },
};

const v$ = useVuelidate(rules, state);

const submit = async () => {
    try {
        const result = await v$.value.$validate();
        if (!result) {
            // notify user form is invalid
            return;
        }
        const data = {
            "method": state.method,
            "profilePhoto": state.profilePhoto.file,
            "firstname": state.firstname,
            "lastname": state.lastname,
            "password": state.password,
            "email": state.email,
            "organization": state.organization,
        }
        isLoading.value = true;
        const response = await store1.service(data);
        if(response.status == 'error') alert(`${response.message}`);
        if(response.status == 'success') router.replace('/');
    } finally {
        isLoading.value = false;
    }
};

const imgPicked = event => {
    state.profilePhoto = event;
};

// const router = useRouter();

// watch(isAuthenticated, () => {
//     if (!isAuthenticated) return;
//     router.replace('/');
// });
</script>

<template>
    <v-card title="Register" class="ma-auto w-50 pa-4 d-flex flex-column align-stretch rounded-lg">
        <div>
            <ImgPickerComponent :avatar="state.profilePhoto.img" @change="imgPicked" />
            <div class="my-4"></div>
            <v-form class="d-flex flex-wrap">
                <v-text-field
                    v-model="state.firstname"
                    class="w-100 px-2"
                    label="First name"
                    :error-messages="v$.firstname.$errors.map(e => e.$message)"
                ></v-text-field>
                <v-text-field
                    v-model="state.lastname"
                    class="w-100 px-2"
                    label="Last name"
                    :error-messages="v$.lastname.$errors.map(e => e.$message)"
                ></v-text-field>

                <v-text-field
                    v-model="state.password"
                    class="w-100 px-2"
                    label="Password"
                    type="password"
                    :error-messages="v$.password.$errors.map(e => e.$message)"
                ></v-text-field>
                <!-- <v-text-field
                    v-model="state.confirmPassword"
                    class="w-50 px-2"
                    label="Confirm password"
                    type="password"
                    :error-messages="v$.confirmPassword.$errors.map(e => e.$message)"
                ></v-text-field> -->

                <v-text-field
                    v-model="state.email"
                    class="w-100 px-2"
                    label="Email"
                    :error-messages="v$.email.$errors.map(e => e.$message)"
                ></v-text-field>
                <v-text-field
                    v-model="state.organization"
                    class="w-100 px-2"
                    label="Organization"
                    :error-messages="v$.organization.$errors.map(e => e.$message)"
                ></v-text-field>
            </v-form>
            <div class="my-2"></div>
            <v-card-actions>
                <VBtn variant="elevated" color="primary" :loading="isLoading" @click="submit"
                    >Next</VBtn
                >
            </v-card-actions>
        </div>
    </v-card>
</template>
