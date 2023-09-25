<script setup>
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
    avatar
});

const submit = async () => {
    try {
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
            <div class="my-4"></div>
            <v-form class="ma-2">
                <v-row>
                    <v-text-field
                        v-model="state.name"
                        label="First name"
                        class="mx-2"
                    ></v-text-field>
                    <v-text-field
                        v-model="state.surname"
                        label="Last name"
                        class="mx-2"
                    ></v-text-field>
                </v-row>
                <v-text-field v-model="state.email" label="Email"></v-text-field>
                <v-text-field v-model="state.organization" label="Organization"></v-text-field>
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
