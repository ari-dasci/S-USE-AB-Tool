<script setup lang="ts">
import ProjectCard from "@/components/ProjectCard.vue";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton.vue";
import { useEvaluatorStore } from "@/store/evaluator.store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const store = useEvaluatorStore();
const { isLoading, projects } = storeToRefs(store);

onMounted(() => {
  return store.getProjects();
});
</script>

<template>
  <div class="p-2 grid items-center md:grid-cols-3 sm:grid-cols-2 gap-2">
    <ProjectCardSkeleton v-if="isLoading" v-for="i in 3" :key="i" />
    <ProjectCard
      v-else
      v-for="project in projects"
      :key="project.id"
      :project="project"
      @click="
        $router.push({
          name: `EvaluateProject`,
          params: { project: project.id },
        })
      "
    />
  </div>
</template>
