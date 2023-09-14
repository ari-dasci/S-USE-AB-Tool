<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Application bar"></v-app-bar>
    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Perfil">
          <RouterLink to="/create-profile" />
        </v-list-item>
        <v-list-item title="Perfil">
          <RouterLink to="/create-profile" />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="d-flex align-center justify-center">
      <RouterView />
    </v-main>
  </v-layout>
</template>