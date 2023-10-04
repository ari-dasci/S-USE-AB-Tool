<script setup>
import { storeToRefs } from 'pinia';
import { computed, reactive } from 'vue';
import { useProjectStore } from '../stores/project';
import { useProjectsStore } from '../stores/projects';

const corelation = [
    {
        title: '1 important',
        value: 1
    },
    {
        title: '2 important',
        value: 2
    },
    {
        title: '3 important',
        value: 3
    },
    {
        title: '4 important',
        value: 4
    },
    {
        title: '5 important',
        value: 5
    }
];

const { evaluationCriteria } = storeToRefs(useProjectsStore());
const { selectedCriteria } = storeToRefs(useProjectStore());

const criteria = computed(() =>
    evaluationCriteria.value.filter(e => selectedCriteria.value.includes(e.id))
);

const length = evaluationCriteria.value.length;
const values = reactive(Array.from({ length }, () => 1).map(() => Array.from({ length }, () => 1)));

console.log(values);

const onChange = (x, y, value) => {
    if (x == y) return;
    values[x][y] = value;
    values[y][x] = value;
};
</script>

<template>
    <div>
        <v-toolbar>
            <div class="w-100 d-flex justify-end">
                <v-card color="success" class="px-4 py-2 ma-2" variant="elevated">CI=0.09</v-card>
            </div>
        </v-toolbar>
        <v-table>
            <thead>
                <th>Criteria</th>
                <th v-for="item of criteria" :key="item.title">{{ item.alias }}</th>
            </thead>
            <tbody>
                <tr v-for="(itemx, x) in criteria" :key="itemx.id">
                    <td>{{ itemx.alias }}</td>
                    <td v-for="(itemy, y) in criteria" :key="`${itemx.id}-${itemy.id}`">
                        <v-select
                            :model-value="values[x][y]"
                            :items="corelation"
                            density="compact"
                            :disabled="x == y"
                            @update:modelValue="any => onChange(x, y, any)"
                        ></v-select>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>
