<template>
    <VCard title="Register" class="ma-auto w-50 pa-4 d-flex flex-column align-stretch rounded-lg">
        <div class="avatar d-flex justify-center align-end">
            <v-avatar color="surface-variant" size="128" class="mx-n6">
                <v-img :src="`https://i.pravatar.cc/300?u=${id}`"></v-img>
            </v-avatar>
            <VBtn icon="add_a_photo" color="primary"> </VBtn>
        </div>
        <div class="my-4"></div>
        <VForm class="ma-2">
            <VTextField v-model="name" label="First name"></VTextField>
            <VTextField v-model="surname" label="Last name"></VTextField>
            <VTextField v-model="email" label="Email"></VTextField>
            <VTextField v-model="organization" label="Organization"></VTextField>
        </VForm>
        <div class="my-2"></div>
        <v-card-actions>
            <VBtn variant="elevated" color="primary" @click="submit">Next</VBtn>
        </v-card-actions>
    </VCard>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { v4 as uuid } from 'uuid';
import { ref } from 'vue';
import { useUserStore } from '../stores/user';

const store = useUserStore();

const { user } = storeToRefs(store);

const id = uuid();
const name = ref(user?.value?.name ?? '');
const surname = ref(user?.value?.surname ?? '');
const email = ref(user?.value?.email ?? '');
const organization = ref(user?.value?.organization ?? '');

const submit = () => {
    store.register({
        id,
        name: name.value,
        surname: surname.value,
        email: email.value,
        organization: organization.value
    });
};
</script>
