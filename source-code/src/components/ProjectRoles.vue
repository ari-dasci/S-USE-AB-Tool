<script setup lang="ts">
import { useProjectsStore } from "@/store/projects.store";
import { useRolesStore } from "@/store/roles.store";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import RolesGroupCard from "./RolesGroupCard.vue";

// const icons: { [key: string]: Icon } = { Speech, EarOff, Hand, EyeOff };

const store = useRolesStore();
const { categories } = storeToRefs(store);

const projectsStore = useProjectsStore();

const { project } = storeToRefs(projectsStore);

const selected = computed(() => project.value?.roles);
const roleScales = computed(
  () => project.value?.roleScales ?? new Map<number, number>()
);

onMounted(async () => {
  store.getRoles();
  await projectsStore.getRoles();
});
</script>

<template>
  <div class="grid grid-rows-4 gap-1">
    <!-- <LoadingOverlay
      class="space-y-1"
      :is-loading="isLoading && selected === undefined"
    > -->
    <div
      class="row-auto gap-1 justify-between align-center border rounded-md flex-col"
      v-for="category in categories"
      :key="category.id"
    >
      <RolesGroupCard
        v-if="selected !== undefined"
        :category="category"
        :initial-selected="selected"
        :initial-scale="roleScales.get(category.id) ?? 100"
        @update:checked="projectsStore.setRole"
        @update:scale="
          (value) => projectsStore.setRoleScale(category.id, value)
        "
      ></RolesGroupCard>
    </div>
    <!-- </LoadingOverlay> -->
  </div>
</template>
