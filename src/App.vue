<script setup>
import { RouterView } from 'vue-router';
import AppDrawer from './components/AppDrawer.vue';
</script>

<template>
  <v-layout>
    <AppDrawer user-avatar="https://i.pravatar.cc/300" user-name="Noe hernandez" user-email="noe.hernandez@correo.com" />
    <v-main class="d-flex h-screen flex-column flex-fill bg-grey">
      <RouterView />
    </v-main>
  </v-layout>
</template>
