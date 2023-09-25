<script setup>
import { reactive, ref } from 'vue';
import { useProjectStore } from '../stores/project';

const emit = defineEmits(['submitted']);

const store = useProjectStore();

const isLoading = ref(false);

const state = reactive({
    alias: '',
    url: ''
});

const onSubmit = async () => {
    try {
        isLoading.value = true;
        await store.createAlternative(state);
        emit('submitted');
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <v-form class="ma-2" @submit.prevent>
        <v-text-field v-model="state.alias" label="Alias" name="alias"></v-text-field>
        <v-text-field v-model="state.url" label="Url" name="url"></v-text-field>
        <div class="my-2"></div>
        <v-card-actions>
            <v-btn
                :loading="isLoading"
                type="submit"
                variant="elevated"
                color="primary"
                @click="onSubmit"
                >Next</v-btn
            >
        </v-card-actions>
    </v-form>
</template>
