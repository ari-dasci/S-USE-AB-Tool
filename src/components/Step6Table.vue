<template>
    <VCard class="my-2">
        <template #title>
            <div class="d-flex justify-space-between">
                <p>Step 6. Comformation of set of users</p>
            </div>
        </template>
        <div class="d-flex flex-column align-center flex-wrap">
            <v-card v-for="v in options" :key="v.id" class="d-flex w-50  ma-1 pa-2">
                <v-icon icon="visibility" />
                <div class="mx-2">{{ v.title }}</div>
                <div class="w-auto">
                    <v-range-slider></v-range-slider>
                </div>
            </v-card>
        </div>
        <v-card-actions class="justify-end">
            <VBtn class="my-4 mx-1" color="primary" variant="elevated">Next</VBtn>
        </v-card-actions>
    </VCard>
</template>


<script setup>


const options = [{
    id: 0,
    title: "Touch",
},
{
    id: 2,
    title: "see",
},
{
    id: 3,
    title: "Hear",
},
{
    id: 4,
    title: "Speak",
},
];
</script>