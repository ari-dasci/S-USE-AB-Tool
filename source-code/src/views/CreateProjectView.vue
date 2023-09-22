<script setup>
import CreateProjectFormComponent from '../components/CreateProjectFormComponent.vue';
</script>

<template>
    <v-card
        title="Create project"
        class="ma-auto w-50 pa-4 d-flex flex-column align-stretch rounded-lg"
    >
        <div class="my-4">
            <CreateProjectFormComponent />
        </div>
    </v-card>
</template>
