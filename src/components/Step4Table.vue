<template>
    <VCard class="my-2">
        <template #title>
            <div class="d-flex justify-space-between">
                <p>Step 4. Comformation of set of users</p>
            </div>
        </template>
        <v-divider></v-divider>
        <div class="d-flex ma-10 align-center justify-center">
            <div class="d-flex flex-column align-center">
                <h2>{{ 100 - percentage }}%</h2>

                <VAvatar color="surface-variant" size="128" class="mx-n6">
                    <VImg src="https://i.pravatar.cc/300"></VImg>
                </VAvatar>
                <div>Experts</div>
            </div>
            <div class="w-50">
                <v-slider class="mx-10 mt-6" step="1" max="100" v-model="percentage" />
            </div>
            <div class="d-flex flex-column align-center">
                <h2>{{ percentage }}%</h2>
                <VAvatar color="surface-variant" size="128" class="mx-n6">
                    <VImg src="https://i.pravatar.cc/300?asdfasdf"></VImg>
                </VAvatar>
                <div>End users</div>
            </div>
        </div>
        <v-card-actions class="justify-end">
            <VBtn @click="router.push('/wizard/5')" class="my-4 mx-1" color="primary" variant="elevated">Next</VBtn>
        </v-card-actions>
    </VCard>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const percentage = ref(50);
</script>