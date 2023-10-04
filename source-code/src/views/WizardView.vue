<script setup>
import { storeToRefs } from 'pinia';
import { computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectStore } from '../stores/project';

import Step5Table from '../components/ConformationOfRoles.vue';
import ProjectAlternativesList from '../components/ProjectAlternativesList.vue';
import Step3Table from '../components/ProjectCriterianCoorelation.vue';
import Step2Table from '../components/ProjectCriteriaSelection.vue';
import Step4Table from '../components/Step4Table.vue';
import Step6Table from '../components/Step6Table.vue';

onMounted(() => {
    store.getProject(route.params.project);
});

onUnmounted(() => {
    store.$reset();
});

const route = useRoute();

const store = useProjectStore();

const { project } = storeToRefs(store);

const step = computed(() => route.query.step ?? 0);

const steps = [
    'conformation of the set of alternatives',
    'conformation of the set of criteria',
    'Elicit pairwise judgements regarding importance of criteria',
    'Comformation of set of users',
    'Conformation of the set of roles',
    'Conformation of the set of roles'
];
</script>

<template>
    <div class="d-flex flex-column pa-2 w-100 h-100">
        <v-card
            :loading="project == null"
            class="d-flex flex-column flex-nowrap align-center justify-center h-25"
        >
            <h1 class="d-flex">{{ project?.title }}</h1>
            <v-avatar size="120" :img="project?.logo"> </v-avatar>
        </v-card>
        <div class="my-1"></div>
        <v-stepper editable :model-value="step">
            <v-stepper-header>
                <v-stepper-item
                    v-for="(title, index) in steps"
                    :key="title"
                    :title="index == step ? title : ''"
                    :value="index"
                    color="primary"
                    :complete="step > index"
                    :editable="step == index"
                >
                </v-stepper-item>
            </v-stepper-header>
            <v-stepper-window>
                <v-stepper-window-item>
                    <v-lazy>
                        <ProjectAlternativesList />
                    </v-lazy>
                </v-stepper-window-item>
                <v-stepper-window-item>
                    <v-lazy>
                        <Step2Table />
                    </v-lazy>
                </v-stepper-window-item>
                <v-stepper-window-item>
                    <v-lazy>
                        <Step3Table />
                    </v-lazy>
                </v-stepper-window-item>
                <v-stepper-window-item>
                    <v-lazy>
                        <Step4Table />
                    </v-lazy>
                </v-stepper-window-item>
                <v-stepper-window-item>
                    <v-lazy>
                        <Step5Table />
                    </v-lazy>
                </v-stepper-window-item>
                <v-stepper-window-item>
                    <v-lazy>
                        <Step6Table />
                    </v-lazy>
                </v-stepper-window-item>
            </v-stepper-window>
            <template #actions>
                <v-stepper-actions
                    @click:prev="
                        () => {
                            $router.go(-1);
                        }
                    "
                    @click:next="
                        () => {
                            $router.push({ query: { step: Number(step) + 1 } });
                        }
                    "
                ></v-stepper-actions>
            </template>
        </v-stepper>
    </div>
</template>

<style>
.v-stepper-window {
    margin: 0 !important;
    overflow-y: auto;
}

.v-table,
.v-window-item {
    height: 100% !important;
}
</style>
