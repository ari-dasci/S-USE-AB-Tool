<script setup>
import { useRoute } from 'vue-router';
import { useProjectsStore } from '../stores/projects';

const route = useRoute();

const store = useProjectsStore();
const project = store.getProjectById(route.params.project);
</script>

<template>
    <div class="ma-2 w-100">
        <v-card class="d-flex flex-column align-center py-2 position-relative">
            <div class="position-absolute h-75 bg-primary"></div>
            <div>
                <h1>{{ project.title }}</h1>
                <v-avatar color="surface-variant" size="128" class="mx-n6">
                    <v-img :src="project.logo"> </v-img>
                </v-avatar>
            </div>
        </v-card>
        <div class="my-2"></div>
        <RouterView />
    </div>
</template>

<style scoped>
.cover {
    background-color: var(--v-theme-surface);
}
</style>
