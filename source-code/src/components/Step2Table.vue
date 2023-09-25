<template>
    <v-data-table
        v-model="selected"
        v-model:items-per-page="itemsPerPage"
        show-select
        :headers="headers"
        :items="criteria"
        item-value="id"
    >
        <template #top>
            <v-toolbar flat>
                <v-toolbar-title>Criterian</v-toolbar-title>
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
import { LoremIpsum } from 'lorem-ipsum';
import { v4 as uuid } from 'uuid';
import { ref } from 'vue';

const itemsPerPage = ref(5);

const selected = ref([]);

// const languages = ['es', 'en'];

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 4,
        min: 2
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

const headers = [
    { title: '#', key: 'index' },
    { title: 'Alias', key: 'alias' },
    { title: 'Name', key: 'name' },
    { title: 'Instructions', key: 'instructions' },
    // { title: 'Language', key: 'index',  },
    { title: 'Responses scale', key: 'scale' }
    // { title: 'Actions', key: 'index',  },
];

const criteria = [
    {
        id: uuid(),
        alias: 'SUS',
        name: 'System usability scale',
        instructions: lorem.generateParagraphs(1),
        scale: '1-5'
    },
    {
        id: uuid(),
        alias: 'NPS',
        name: 'Net promoter score',
        instructions: lorem.generateParagraphs(1),
        scale: '0-10'
    },
    {
        id: uuid(),
        alias: 'Usability test',
        name: 'Set of activities for LMS',
        instructions: lorem.generateParagraphs(1),
        scale: '5^5'
    },
    {
        id: uuid(),
        alias: 'ACC',
        name: lorem.generateSentences(1),
        instructions: lorem.generateParagraphs(1),
        scale: '5^5'
    }
];
</script>
