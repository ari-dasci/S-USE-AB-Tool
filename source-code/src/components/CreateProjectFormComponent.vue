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
    title: '',
    logo: null,
    start: null,
    end: null
});

const rules = {
    title: { required },
    logo: { required },
    start: { required },
    end: { required }
};

const v$ = useVuelidate(rules, state);

const onPicked = async img => {
    state.logo = img;
};

const onSubmit = async () => {
    try {
        isLoading.value = true;
        const isFormCorrect = await v$.value.$validate();
        if (!isFormCorrect) return;
        const { title, logo, start, end } = state;
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
        <div class="d-flex">
            <v-text-field
                v-model="state.start"
                label="Start date"
                class="mr-1"
                type="datetime-local"
                name="start"
            />
            <v-text-field
                v-model="state.end"
                label="End date"
                class="ml-1"
                type="datetime-local"
                name="end"
            />
        </div>
        <div class="my-2"></div>
        <v-card-actions>
            <VBtn :loading="isLoading" type="submit" variant="elevated" color="primary">Next</VBtn>
        </v-card-actions>
    </VForm>
</template>
