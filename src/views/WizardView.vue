<script setup>
import { useRoute } from 'vue-router';
import { useProjectsStore } from '../stores/projects';

const route = useRoute();

const store = useProjectsStore();
const project = store.getProjectById(route.params.project);
</script>

<template>
    <div class="ma-2 w-100">
        <div id="cover" class="d-flex flex-column align-center py-4 rounded my-2 bg-surface">
            <h1>{{ project.title }}</h1>
            <VAvatar color="surface-variant" size="128" class="mx-n6">
                <VImg :src="project.logo"> </VImg>
            </VAvatar>
        </div>
        <RouterView />
    </div>
</template>

<style scoped>
div#cover {
    background: var(--v-theme-primary);
}
</style>
