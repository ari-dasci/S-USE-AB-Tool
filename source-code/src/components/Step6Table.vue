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
    <v-card class="d-flex flex-column align-center">
        <v-card v-for="v in selectedCategories" :key="v" class="d-flex align-center w-50 ma-1 pa-2">
            <div class="w-25">
                <v-icon class="mr-2" :icon="roleCategoriesMap[v].icon" />{{
                    roleCategoriesMap[v].title
                }}
            </div>
            <v-range-slider
                :color="roleCategoriesMap[v].color"
                :model-value="[10, 60]"
                track-color="grey"
            >
            </v-range-slider>
        </v-card>
    </v-card>
</template>
