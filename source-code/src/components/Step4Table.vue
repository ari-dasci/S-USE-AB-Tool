<template>
    <v-card>
        <div class="d-flex ma-10 align-center justify-center">
            <div class="d-flex flex-column align-center">
                <h2>{{ 100 - percentage }}%</h2>
                <v-img width="150" src="/images/experts.png"></v-img>
                <div>Experts</div>
            </div>
            <div class="w-50">
                <v-slider
                    v-model="percentage"
                    class="mx-10 mt-6"
                    step="1"
                    max="100"
                    color="grey"
                    track-color="grey"
                    thumb-color="grey"
                />
            </div>
            <div class="d-flex flex-column align-center">
                <h2>{{ percentage }}%</h2>
                <v-img width="150" src="/images/end-users.png"></v-img>
                <div>End users</div>
            </div>
        </div>
    </v-card>
</template>

<script setup>
import { ref } from 'vue';

const percentage = ref(50);
</script>
