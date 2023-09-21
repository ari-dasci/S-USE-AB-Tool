<script setup>
import { RouterView } from 'vue-router';
import DrawerComponent from './components/DrawerComponent.vue';
</script>

<template>
    <v-layout>
        <DrawerComponent />
        <v-main class="d-flex h-screen justify-center bg-blue-grey-lighten-3">
            <RouterView />
        </v-main>
    </v-layout>
</template>
