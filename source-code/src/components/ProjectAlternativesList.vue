<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import AddAlternativeFormComponent from '../components/AddAltenativeFormComponent.vue';
import { useProjectStore } from '../stores/project';

const headers = [
    { title: '#', key: 'index', sortable: false },
    { title: 'Alias', key: 'alias', sortable: false },
    { title: 'Url', key: 'url', sortable: false },
    { title: 'Logo', key: 'logo', sortable: false },
    { title: 'Actions', key: 'actions', sortable: false }
];

const dialog = ref(false);
const dialogDelete = ref(false);
const editedItem = ref(null);

const isLoading = ref(false);

const store = useProjectStore();

const { alternatives } = storeToRefs(store);

const selected = ref(alternatives.value.map(({ id }) => id));

const deleteItem = item => {
    editedItem.value = Object.assign({}, item);
    dialogDelete.value = true;
};

const closeDelete = () => (dialogDelete.value = false);

const deleteItemConfirm = async () => {
    try {
        isLoading.value = true;
        const { id } = editedItem.value;
        await store.deleteAlternative(id);
        selected.value = selected.value.filter(e => e != id);
        closeDelete();
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <v-data-table
        v-model="selected"
        show-select
        :headers="headers"
        :items="alternatives"
        :loading="isLoading"
        item-value="id"
        fixed-footer
    >
        <template #top>
            <v-toolbar flat>
                <v-toolbar-title>Alternatives</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog">
                    <template #activator="{ props }">
                        <v-btn v-bind="props" prepend-icon="add" title="add project" color="primary"
                            >add</v-btn
                        >
                    </template>
                    <v-card
                        title="Add Alternative"
                        class="ma-auto w-50 pa-4 d-flex flex-column align-stretch rounded-lg"
                    >
                        <div class="my-4">
                            <AddAlternativeFormComponent @submitted="() => (dialog = false)" />
                        </div>
                    </v-card>
                </v-dialog>
            </v-toolbar>
            <v-dialog v-model="dialogDelete" class="rounded" max-width="500px">
                <v-card>
                    <v-card-title class="text-h5"
                        >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                            >Cancel</v-btn
                        >
                        <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm"
                            >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>
        <template #item.index="{ item }">
            {{ item.index + 1 }}
        </template>
        <template #item.logo="{ item }">
            <td>
                <v-avatar size="24">
                    <v-img
                        :src="`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item.selectable.url}&size=68`"
                    >
                    </v-img>
                </v-avatar>
            </td>
        </template>
        <template #item.url="{ item }">
            <td>
                <a :href="item.selectable.url" target="_blank">{{ item.selectable.url }} </a>
            </td>
        </template>
        <template #item.actions="{ item }">
            <td>
                <v-icon class="mx-1" icon="edit" color="primary" size="small"></v-icon>
                <v-icon
                    class="mx-1"
                    icon="delete"
                    color="error"
                    size="small"
                    @click="deleteItem(item.raw)"
                ></v-icon>
            </td>
        </template>
    </v-data-table>
</template>
