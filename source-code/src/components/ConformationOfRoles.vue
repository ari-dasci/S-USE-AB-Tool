<script setup>
import { storeToRefs } from 'pinia';
import { useProjectStore } from '../stores/project';
import { useProjectsStore } from '../stores/projects';

const store = useProjectStore();

const { selectedRoles } = storeToRefs(store);
const { updateRoles } = store;

const mainStore = useProjectsStore();
const { groupedRoles, roleCategoriesMap } = mainStore;
</script>

<template>
    <v-card>
        <div class="d-flex flex-wrap align-content-space-evenly">
            <v-col v-for="(v, k) of groupedRoles" :key="k">
                <v-list-item
                    v-for="e in v"
                    :key="e.id"
                    :title="e.title"
                    :subtitle="e.subtitle"
                    :active="selectedRoles.has(e.id)"
                    class="ma-1 rounded"
                    variant="elevated"
                    :color="roleCategoriesMap[e.category].color"
                    @click="() => updateRoles(e.id)"
                >
                    <template #prepend>
                        <img style="height: 100px" :src="e.icon" />
                    </template>
                </v-list-item>
            </v-col>
        </div>
    </v-card>
</template>
