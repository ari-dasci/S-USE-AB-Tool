<script setup>
import useVuelidate from '@vuelidate/core';
import { email as emailValidator, required } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { v4 as uuid } from 'uuid';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import ImgPickerComponent from '../components/ImgPickerComponent.vue';
import { useUserStore } from '../stores/user';

const store = useUserStore();

const { user, isAuthenticated } = storeToRefs(store);

const isLoading = ref(false);

const {
    id = uuid(),
    name = '',
    surname = '',
    email = '',
    organization = '',
    avatar = `https://i.pravatar.cc/300?u=${id}`
} = user.value ?? {};

const state = reactive({
    id,
    name,
    surname,
    email,
    organization,
    avatar,
    password: '',
    confirmPassword: ''
});

const rules = {
    name: { required },
    surname: { required },
    email: { required, emailValidator },
    organization: { required },
    password: { required },
    confirmPassword: { required }
};

const v$ = useVuelidate(rules, state);

const submit = async () => {
    try {
        const result = await v$.value.$validate();
        if (!result) {
            // notify user form is invalid
            return;
        }
        isLoading.value = true;
        await store.register(state);
    } finally {
        isLoading.value = false;
    }
};

const imgPicked = event => {
    state.avatar = event;
};

const router = useRouter();

watch(isAuthenticated, () => {
    if (!isAuthenticated) return;
    router.replace('/');
});
</script>

<template>
    <v-card title="Register" class="ma-auto w-50 pa-4 d-flex flex-column align-stretch rounded-lg">
        <div>
            <ImgPickerComponent :avatar="state.avatar" @change="imgPicked" />
            <div class="my-12"></div>
            <v-form>
                <v-text-field
                    v-model="state.name"
                    label="First name"
                    :error-messages="v$.name.$errors.map(e => e.$message)"
                ></v-text-field>
                <v-text-field
                    v-model="state.surname"
                    label="Last name"
                    :error-messages="v$.surname.$errors.map(e => e.$message)"
                ></v-text-field>

                <v-text-field
                    v-model="state.password"
                    label="Password"
                    :error-messages="v$.password.$errors.map(e => e.$message)"
                ></v-text-field>
                <v-text-field
                    v-model="state.confirmPassword"
                    label="Confirm password"
                    :error-messages="v$.confirmPassword.$errors.map(e => e.$message)"
                ></v-text-field>

                <v-text-field
                    v-model="state.email"
                    label="Email"
                    :error-messages="v$.email.$errors.map(e => e.$message)"
                ></v-text-field>
                <v-text-field
                    v-model="state.organization"
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
