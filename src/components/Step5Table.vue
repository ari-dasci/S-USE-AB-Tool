<template>
    <VCard>
        <template #title>
            <div class="d-flex justify-space-between">
                <p>Step 5. Comformation of set of users</p>
            </div>
        </template>
        <div class="d-flex flex-wrap align-content-space-evenly">
            <div v-for="v in options" :key="v.id" class="w-25 p-2">
                <v-list-item
                    :title="v.title"
                    :subtitle="v.subtitle"
                    :active="selected.has(v.id)"
                    class="d-inline-block ma-1 rounded"
                    prepend-icon="visibility"
                    variant="elevated"
                    active-color="secondary"
                    @click="() => (selected.has(v.id) ? selected.delete(v.id) : selected.add(v.id))"
                >
                </v-list-item>
            </div>
        </div>
        <v-card-actions class="justify-end">
            <VBtn
                class="my-4 mx-1"
                color="primary"
                variant="elevated"
                :to="`/projects/${$route.params.project}/wizard/6`"
                >Next</VBtn
            >
        </v-card-actions>
    </VCard>
</template>

<script setup>
import { ref } from 'vue';

const selected = ref(new Set());

const options = [
    {
        id: 0,
        title: 'Blind',
        subtitle: 'Permanent visual impairment.',
        category: ''
    },
    {
        id: 2,
        title: 'One arm',
        subtitle: 'Permanent visual impairment.',
        category: ''
    },
    {
        id: 3,
        title: 'Deaf',
        subtitle: 'Situationaly visual impairment ',
        category: ''
    },
    {
        id: 4,
        title: 'Non verbal',
        subtitle: 'Situationaly visual impairment ',
        category: ''
    },
    {
        id: 5,
        title: 'Cataratas',
        subtitle: 'Permanent visual impairment.',
        category: ''
    },
    {
        id: 6,
        title: 'Arm injury',
        subtitle: 'Permanent visual impairment.',
        category: ''
    },
    {
        id: 7,
        title: 'Ear infection',
        subtitle: 'Permanent visual impairment.',
        category: ''
    },
    {
        id: 8,
        title: 'Laryngitis',
        subtitle: 'Permanent visual impairment.',
        category: ''
    },
    {
        id: 9,
        title: 'Distracted',
        subtitle: 'Permanent visual impairment.',
        category: ''
    },
    {
        id: 10,
        title: 'New parent',
        subtitle: 'Permanent visual impairment.',
        category: ''
    },
    {
        id: 11,
        title: 'Bartender',
        subtitle: 'Permanent visual impairment.',
        category: ''
    },
    {
        id: 12,
        title: 'Heavy accent',
        subtitle: 'Permanent visual impairment.',
        category: ''
    }
];
</script>
