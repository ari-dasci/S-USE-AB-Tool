<script setup>
import { ref } from 'vue';
const props = defineProps({ avatar: { type: String, default: null } });
const emit = defineEmits(['change']);

const isLoading = ref(false);

const pickFile = () => {
    document.querySelector('#file-picker').click();
};

const filePicked = async ({ target }) => {
    try {
        const { files } = target;
        if (!files) return;
        isLoading.value = true;
        const img = await getImgData(files[0]);
        emit('change', img);
    } finally {
        isLoading.value = false;
    }
};

const getImgData = file => {
    if (!file) return Promise.resolve();

    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        const timer = setTimeout(reject, 5000);
        fileReader.readAsDataURL(file);
        fileReader.addEventListener('load', function () {
            clearTimeout(timer);
            resolve(this.result);
        });
    });
};
</script>

<template>
    <div class="avatar d-flex justify-center align-end ma-4">
        <v-avatar color="surface-variant" size="128" class="mx-n6">
            <v-img :src="props.avatar" cover></v-img>
        </v-avatar>
        <input
            id="file-picker"
            type="file"
            accept="image/png, image/jpeg, image/bmp"
            hidden
            @change="filePicked"
        />
        <v-btn icon="add_a_photo" color="primary" :loading="isLoading" @click="pickFile"> </v-btn>
    </div>
</template>
