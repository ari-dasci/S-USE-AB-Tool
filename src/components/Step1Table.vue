<!-- eslint-disable vue/valid-v-slot -->
<template>
    <VCard>
        <template #title>
            <p>Step 1. conformation of the set of alternatives</p>
        </template>
        <v-divider></v-divider>
        <v-data-table show-select items-per-page="5" :headers="headers" :items="alternatives">
            <template v-slot:item.index="{ item }">
                {{ item.index + 1 }}
            </template>
            <template v-slot:item.logo="{ item }">
                <td>
                    <v-img :src="item.logo">

                    </v-img>
                </td>
            </template>
            <template v-slot:item.actions="{}">
                <td>
                    <VBtn class="mx-1" icon="edit" color="primary" size="small"></VBtn>
                    <VBtn class="mx-1" icon="visibility_off" color="secondary" size="small"></VBtn>
                    <VBtn class="mx-1" icon="delete" color="error" size="small"></VBtn>
                </td>
            </template>
        </v-data-table>
        <v-card-actions class="justify-end">
            <VBtn class="my-4 mx-1" color="secondary" variant="elevated" prepend-icon="add">add</VBtn>
            <VBtn @click="router.push('/wizard/2')" class="my-4 mx-1" color="primary" variant="elevated">Next</VBtn>
        </v-card-actions>
    </VCard>
</template>


<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();


const headers = [
    { title: '#', key: 'index' },
    { title: 'Alias', key: 'alias' },
    { title: 'Url', key: 'url' },
    { title: 'Logo', key: 'logo' },
    { title: 'Actions', key: 'actions' },
];

const alternatives = [
    {
        alias: 'UDG',
        url: 'https://udg.mx',
        logo: 'https://cursoavanza.com/wp-content/uploads/2017/12/UDG.png',

    },
    {
        alias: 'UGR',
        url: 'https://ugr.es',
        logo: '',

    },
    {
        alias: 'UA',
        url: 'https://uatlantico.col',
        logo: '',

    },
]
</script>