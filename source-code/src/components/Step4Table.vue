<template>
    <v-card>
        <div class="d-flex ma-10 align-center justify-center">
            <div class="d-flex flex-column align-center">
                <v-img width="150" src="/images/experts.png"></v-img>
                <div>Experts</div>
            </div>
            <div class="w-50">
                <v-slider
                    v-model="percentageE"
                    class="mx-10 mt-6"
                    step="1"
                    max="100"
                    color="blue-lighten-1"
                    track-color="blue-lighten-1"
                    thumb-color="blue-lighten-1"
                />
            </div>
            <div>
                <h2>{{percentageE}}%</h2>
            </div>
        </div>
        <div class="d-flex ma-10 align-center justify-center">
                <div class="d-flex flex-column align-center">
                    <v-img width="150" src="/images/end-users.png"></v-img>
                    <div>End users</div>
                </div>
                <div class="w-50">
                    <v-slider
                        v-model="percentageU"
                        class="mx-10 mt-6"
                        step="2"
                        max="100"
                        color="blue-lighten-1"
                        track-color="blue-lighten-1"
                        thumb-color="blue-lighten-1"
                    />
                </div>
                <div><h2>{{percentageU}}%</h2></div> 
            </div>
    </v-card>
</template>

<script setup>
import { ref } from 'vue';

const percentageE = ref(50);
const percentageU = ref(50);
</script>
