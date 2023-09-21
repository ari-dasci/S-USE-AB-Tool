<template>
    <VCard class="d-flex flex-column align-center">
        <template #title>
            <p class="align-self-start">Step 6. Comformation of set of users</p>
        </template>
        <v-card v-for="v in options" :key="v.id" class="d-flex align-center w-50 ma-1 pa-2">
            <div class="w-25"><v-icon class="mr-2" icon="visibility" />{{ v.title }}</div>
            <v-range-slider :color="v.color" :model-value="[10, 60]" track-color="grey">
            </v-range-slider>
        </v-card>
        <v-card-actions class="align-self-end">
            <VBtn class="my-4 mx-1" color="primary" variant="elevated">Next</VBtn>
        </v-card-actions>
    </VCard>
</template>

<script setup>
const options = [
    {
        id: 0,
        title: 'Touch',
        color: 'red'
    },
    {
        id: 2,
        title: 'see',
        color: 'green'
    },
    {
        id: 3,
        title: 'Hear',
        color: 'blue'
    },
    {
        id: 4,
        title: 'Speak',
        color: 'yellow'
    }
];
</script>
