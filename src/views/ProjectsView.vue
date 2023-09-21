<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import CreateProjectFormComponent from '../components/CreateProjectFormComponent.vue';
import { useProjectsStore } from '../stores/projects';

const dialog = ref(false);

const store = useProjectsStore();
const { projects } = storeToRefs(store);
const intl = new Intl.DateTimeFormat('es-MX');
</script>

<template>
    <v-card class="w-100 ma-2">
        <v-toolbar flat>
            <v-toolbar-title>My projects</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog">
                <template #activator="{ props }">
                    <v-btn v-bind="props" prepend-icon="add" title="add project" color="primary"
                        >add project</v-btn
                    >
                </template>
                <v-card
                    title="Create project"
                    class="ma-auto w-50 pa-4 d-flex flex-column align-stretch rounded-lg"
                >
                    <div class="my-4">
                        <CreateProjectFormComponent @submited="() => (dialog = false)" />
                    </div>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <div class="d-flex flex-wrap">
            <div v-for="project in projects" :key="project.id" class="w-25 pa-2">
                <v-card max-width="344" class="flex-column" :to="`/projects/${project.id}/wizard`">
                    <v-img height="120" :src="project.logo" cover />
                    <v-card-title>{{ project.title }} </v-card-title>
                    <v-card-subtitle>
                        {{ intl.format(project.start) }} -
                        {{ intl.format(project.end) }}</v-card-subtitle
                    >
                </v-card>
            </div>
        </div>
    </v-card>
</template>

<style scoped></style>
