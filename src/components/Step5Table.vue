<template>
    <VCard class="my-2">
        <template #title>
            <div class="d-flex justify-space-between">
                <p>Step 5. Comformation of set of users</p>
            </div>
        </template>
        <div class="d-flex flex-wrap align-content-space-evenly">
            <v-card v-for="v in options" :key="v.id"
                @click="selected.has(v.id) ? selected.delete(v.id) : selected.add(v.id)"
                :class="{ 'bg-secondary': selected.has(v.id) }" :append-icon="selected.has(v.id) ? 'check' : ''"
                :title="v.title" :subtitle="v.subtitle" class="d-inline-block ma-1" prepend-icon="visibility">
            </v-card>
        </div>
        <v-card-actions class="justify-end">
            <VBtn @click="router.push('/wizard/6')" class="my-4 mx-1" color="primary" variant="elevated">Next</VBtn>
        </v-card-actions>
    </VCard>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();

const selected = ref(new Set());

const options = [{
    id: 0,
    title: "Blind",
    subtitle: "Permanent visual impairment."
},
{
    id: 2,
    title: "One arm",
    subtitle: "Permanent visual impairment."
},
{
    id: 3,
    title: "Deaf",
    subtitle: "Situationaly visual impairment "
},
{
    id: 4,
    title: "Non verbal",
    subtitle: "Situationaly visual impairment "
},
{
    id: 5,
    title: "Cataratas",
    subtitle: "Permanent visual impairment."
},
{
    id: 6,
    title: "Arm injury",
    subtitle: "Permanent visual impairment."
},
{
    id: 7,
    title: "Ear infection",
    subtitle: "Permanent visual impairment."
},
{
    id: 8,
    title: "Laryngitis",
    subtitle: "Permanent visual impairment."
},
{
    id: 9,
    title: "Distracted",
    subtitle: "Permanent visual impairment."
},
{
    id: 10,
    title: "New parent",
    subtitle: "Permanent visual impairment."
},
{
    id: 11,
    title: "Bartender",
    subtitle: "Permanent visual impairment."
},
{
    id: 12,
    title: "Heavy accent",
    subtitle: "Permanent visual impairment."
},
];
</script>