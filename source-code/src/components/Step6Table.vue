<script setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useProjectStore } from '../stores/project';
import { useProjectsStore } from '../stores/projects';

const { roles, roleCategoriesMap } = useProjectsStore();

const { selectedRoles } = storeToRefs(useProjectStore());

const selectedCategories = computed(() => {
    return roles
        .filter(e => selectedRoles.value.has(e.id))
        .reduce((acc, curr) => {
            acc.add(curr.category);
            return acc;
        }, new Set());
});
</script>

<template>
    <v-card class="d-flex flex-wrap align-center">
        <div v-for="v in selectedCategories" :key="v" class="w-50 pa-2">
            <v-card class="d-flex pa-2 align-center justify-space-between">
                <v-icon class="mr-2" :icon="roleCategoriesMap[v].icon" />{{
                    roleCategoriesMap[v].title
                }}
                <v-slider
                    class="w-75"
                    :color="roleCategoriesMap[v].color"
                    :model-value="10"
                    track-color="grey"
                >
                </v-slider>
            </v-card>
        </div>
    </v-card>
</template>
