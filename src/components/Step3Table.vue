<template>
    <VCard>
        <template #title>
            <div class="d-flex justify-space-between">
                <p>Step 3. Elicit pairwise judgements regarding importance of criteria</p>
                <v-chip class="bg-success">CI=.09</v-chip>
            </div>
        </template>
        <v-divider></v-divider>
        <v-table :headers="criteria" :items="criteria">
            <thead>
                <th>Criteria</th>
                <th v-for="item of criteria" :key="item.title">{{ item.alias }}</th>
            </thead>
            <tbody>
                <tr v-for="item of criteria" :key="item.title">
                    <td>{{ item.alias }}</td>
                    <td v-for="item2 of criteria" :key="item2.title">
                        <v-select
                            v-model="value"
                            :items="criteriaImportance"
                            density="compact"
                            :disabled="item.id == item2.id"
                        ></v-select>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <v-card-actions class="justify-end">
            <VBtn
                class="my-4 mx-1"
                color="primary"
                variant="elevated"
                :to="`/projects/${$route.params.project}/wizard/4`"
                >Next</VBtn
            >
        </v-card-actions>
    </VCard>
</template>

<script setup>
import { LoremIpsum } from 'lorem-ipsum';

const value = [];

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

const criteria = [
    {
        id: 1,
        alias: 'SUS',
        title: 'System usability scale',
        instructions: lorem.generateParagraphs(1),
        responsesScale: ''
    },
    {
        id: 2,
        alias: 'NPS',
        title: 'Net promoter score',
        instructions: lorem.generateParagraphs(1),
        responsesScale: ''
    },
    {
        id: 3,
        alias: 'Usability test',
        title: 'Set of activities for LMS',
        instructions: lorem.generateParagraphs(1),
        responsesScale: ''
    }
];

const criteriaImportance = [
    {
        title: 'Equally important',
        value: null
    }
];
</script>
