<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive, ref } from 'vue';
import { useProjectsStore } from '../stores/projects';

const store = useProjectsStore();

const isLoading = ref(false);
const state = reactive({
    title: '',
    picked: null,
    start: null,
    end: null
});

const rules = {
    title: { required },
    picked: { required },
    start: { required },
    end: { required }
};

const v$ = useVuelidate(rules, state);

const onSubmit = async () => {
    try {
        isLoading.value = true;
        const { title, picked, start, end } = v$.value;
        const logo = await getImgData(picked[0]);
        await store.createProject({ title, logo, start: new Date(start), end: new Date(end) });
        this.$emit('submited');
    } finally {
        isLoading.value = false;
    }
};
const getImgData = files => {
    if (!files) return Promise.resolve();

    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        const timer = setTimeout(reject, 5000);
        fileReader.readAsDataURL(files);
        fileReader.addEventListener('load', function () {
            clearTimeout(timer);
            resolve(this.result);
        });
    });
};
</script>

<template>
    <VForm class="ma-2" @submit.prevent="onSubmit">
        <VTextField v-model="state.title" label="Project name" name="title"></VTextField>
        <VFileInput
            v-model="state.picked"
            label="Logo"
            prepend-icon="image"
            accept="image/png, image/jpeg, image/bmp"
            name="logo"
        ></VFileInput>
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
