<template>
    <VCard class="my-2">
        <template #title>
            <div class="d-flex justify-space-between">
                <p>Step 3. Elicit pairwise judgements regarding importance of criteria</p>
                <v-chip class="bg-success">CI=.09</v-chip>
            </div>
        </template>
        <v-divider></v-divider>
        <v-data-table show-select :items="criteria">
            <thead>
                <tr>
                    <th class="text-left">
                        Criteria
                    </th>
                    <th class="text-left">
                        SUS
                    </th>
                    <th class="text-left">
                        NPS
                    </th>
                    <th class="text-left">
                        Usability Test
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) of criteria" :key="item.name">
                    <td>{{ item.alias }}</td>
                    <td><v-select v-model="value" :items="criteriaImportance" density="compact"></v-select></td>
                    <td><v-select v-model="value" :items="criteriaImportance" density="compact"></v-select></td>
                    <td><v-select v-model="value" :items="criteriaImportance" density="compact"></v-select></td>
                </tr>
            </tbody>
        </v-data-table>
        <v-card-actions class="justify-end">
            <VBtn @click="router.push('/wizard/4')" class="my-4 mx-1" color="primary" variant="elevated">Next</VBtn>
        </v-card-actions>
    </VCard>
</template>


<script setup>
import { LoremIpsum } from "lorem-ipsum";

import { useRouter } from "vue-router";

const router = useRouter();



const value = [null];

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
        visible: true,
        alias: 'SUS',
        name: 'System usability scale',
        instructions: lorem.generateParagraphs(1),
        responsesScale: ''
    },
    {
        visible: true,
        alias: 'NPS',
        name: 'Net promoter score',
        instructions: lorem.generateParagraphs(1),
        responsesScale: ''
    },
    {
        visible: true,
        alias: 'Usability test',
        name: 'Set of activities for LMS',
        instructions: lorem.generateParagraphs(1),
        responsesScale: ''
    },

];

const criteriaImportance = [{
    title: "Equally important",
    value: null,
}];

</script>