<script setup>
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import DrawerComponent from '../components/DrawerComponent.vue';
import { useUserStore } from '../stores/user';

const store = useUserStore();
const { isAuthenticated } = storeToRefs(store);

const router = useRouter();

watch(isAuthenticated, () => {
    if (isAuthenticated) return;
    router.replace('/signUp');
});
</script>

<template>
    <v-layout>
        <DrawerComponent />
        <v-main class="d-flex h-screen justify-center">
            <RouterView />
        </v-main>
    </v-layout>
</template>
