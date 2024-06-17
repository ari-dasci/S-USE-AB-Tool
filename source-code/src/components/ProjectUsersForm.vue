<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { useProjectsStore } from "@/store/projects.store";
import { watchDebounced } from "@vueuse/core";
import { GraduationCapIcon, UsersIcon } from "lucide-vue-next";
// import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import ProjectEvaluators from "./ProjectEvaluators.vue";
import RoleWeightCard from "./RoleWeightCard.vue";

const store = useProjectsStore();

// const { isLoading } = storeToRefs(store);

const experts = ref<number[]>([100]);
const endUsers = ref<number[]>([100]);

watchDebounced(
  experts,
  () => {
    store.setUserScale("EXPERT", experts.value[0]);
  },
  { debounce: 1000 }
);

watchDebounced(
  endUsers,
  () => {
    store.setUserScale("ENDUSER", endUsers.value[0]);
  },
  { debounce: 1000 }
);

onMounted(async () => {
  await store.getUsersScale();
  experts.value = [store.project?.usersScale?.experts ?? 0];
  endUsers.value = [store.project?.usersScale?.endUsers ?? 0];
});
</script>

<template>
  <div class="space-y-4">
    <ProjectEvaluators />

    <div class="flex flex-col space-y-2">
      <div>
        <Label> Roles weight </Label>
        <p class="text-sm">weights per user evaluation</p>
      </div>

      <div class="flex flex-wrap">
        <RoleWeightCard v-model="endUsers">
          <UsersIcon />
          <div class="text-center">
            <Label> Users </Label>
          </div>
        </RoleWeightCard>

        <RoleWeightCard v-model="experts">
          <GraduationCapIcon />
          <div class="content-center">
            <Label> Experts </Label>
          </div>
        </RoleWeightCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
body::-webkit-scrollbar {
  width: 12px;
}
</style>
