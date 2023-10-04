<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive, ref } from 'vue';
import { useProjectsStore } from '../stores/projects';
import ImgPickerComponent from './ImgPickerComponent.vue';

const emit = defineEmits(['submitted']);
const store = useProjectsStore();

const isLoading = ref(false);

const state = reactive({
    logo: null,
    title: '',
    date: []
});

const rules = {
    title: { required },
    logo: { required }
};

const v$ = useVuelidate(rules, state);

const onPicked = async img => {
    state.logo = img;
};

const onSubmit = async () => {
    try {
        isLoading.value = true;
        const { title, logo, date } = state;
        const [start, end] = date;
        await store.createProject({ title, logo, start: new Date(start), end: new Date(end) });
        emit('submitted');
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <VForm class="ma-2" @submit.prevent="onSubmit">
        <ImgPickerComponent :avatar="state.logo" @change="onPicked" />
        <VTextField v-model="state.title" label="Project name" name="title"></VTextField>
        <v-menu :close-on-content-click="false">
            <template #activator="{ props }">
                <v-text-field
                    v-model="state.date"
                    label="Picker in menu"
                    prepend-icon="event"
                    readonly
                    v-bind="props"
                ></v-text-field>
            </template>
            <v-date-picker v-model="state.date" multiple scrollable range> </v-date-picker>
        </v-menu>
        <div class="my-2"></div>
        <v-card-actions>
            <VBtn :loading="isLoading" type="submit" variant="elevated" color="primary">Next</VBtn>
        </v-card-actions>
    </VForm>
</template>
