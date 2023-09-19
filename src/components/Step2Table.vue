<!-- eslint-disable vue/valid-v-slot -->
<template>
    <VCard class="my-2">
        <template #title>
            <p>Step 2. conformation of the set of criteria</p>
        </template>
        <v-divider></v-divider>
        <v-data-table v-model="selected" show-select v-model:items-per-page="itemsPerPage" :headers="headers"
            :items="criteria" item-value="alias">
            <template v-slot:item.scale="{ item }">
                <v-chip>{{ item.columns.scale }}</v-chip>
            </template>
            <template v-slot:item.index="{ item }">
                {{ item.index + 1 }}
            </template>
        </v-data-table>
        <v-card-actions class="justify-end">
            <VBtn class="my-4 mx-1" color="secondary" variant="elevated" prepend-icon="attach_file">add Files</VBtn>
            <VBtn @click="router.push('/wizard/3')" class="my-4 mx-1" color="primary" variant="elevated">Next</VBtn>
        </v-card-actions>
    </VCard>
</template>


<script setup>

import { LoremIpsum } from "lorem-ipsum";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

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
    { title: '#', key: 'index', },
    { title: 'Alias', key: 'alias', },
    { title: 'Name', key: 'name', },
    { title: 'Instructions', key: 'instructions', },
    // { title: 'Language', key: 'index',  },
    { title: 'Responses scale', key: 'scale', },
    // { title: 'Actions', key: 'index',  },
];

const criteria = [
    {
        visible: true,
        alias: 'SUS',
        name: 'System usability scale',
        instructions: lorem.generateParagraphs(1),
        scale: '1-5'
    },
    {
        visible: true,
        alias: 'NPS',
        name: 'Net promoter score',
        instructions: lorem.generateParagraphs(1),
        scale: '0-10'
    },
    {
        visible: true,
        alias: 'Usability test',
        name: 'Set of activities for LMS',
        instructions: lorem.generateParagraphs(1),
        scale: '5^5'
    },

];

</script>