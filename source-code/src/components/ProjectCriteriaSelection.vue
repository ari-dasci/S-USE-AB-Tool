<template>
    <v-data-table
        v-model:items-per-page="itemsPerPage"
        :mode-value="selectedCriteria"
        :headers="headers"
        :items="evaluationCriteria"
        item-value="id"
        show-select
        @update:model-value="onChange"
    >
        <template #top>
            <v-toolbar flat>
                <v-toolbar-title>Criteria</v-toolbar-title>
            </v-toolbar>
        </template>
        <template #item.scale="{ item }">
            <v-chip>{{ item.columns.scale }}</v-chip>
        </template>
        <template #item.index="{ item }">
            {{ item.index + 1 }}
        </template>
    </v-data-table>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useProjectStore } from '../stores/project';
import { useProjectsStore } from '../stores/projects';

const itemsPerPage = ref(10);

const headers = [
    // { title: 'Visible', key: 'index' },
    { title: 'Alias', key: 'alias' },
    { title: 'Name', key: 'name' },
    { title: 'Instructions', key: 'instructions' },
    // { title: 'Language', key: 'index',  },
    //{ title: 'Responses scale', key: 'scale' }
    // { title: 'Actions', key: 'index',  },
];

const store = useProjectsStore();

const { evaluationCriteria } = storeToRefs(store);

const projectStore = useProjectStore();
const { selectedCriteria } = storeToRefs(projectStore);
const onChange = selected => {
    projectStore.setEvaluationCriteria(selected);
};
</script>
