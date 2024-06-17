<script setup lang="ts">
import ProjectCard from "@/components/ProjectCard.vue";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton.vue";
import { useProjectsStore } from "@/store/projects.store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const store = useProjectsStore();
const { isLoading, projects } = storeToRefs(store);

onMounted(() => {
  return store.getProjects();
});
</script>

<template>
  <div>
    <div
      v-if="isLoading || projects.length"
      class="p-2 grid items-center md:grid-cols-3 sm:grid-cols-2 gap-2"
      gap-2
    >
      <ProjectCardSkeleton
        v-if="isLoading && projects.length === 0"
        v-for="i in 3"
        :key="i"
      />
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
        @click="$router.push(`/project/${project.id}`)"
      />
    </div>
    <div v-else class="items-center">There is no projects yet</div>
  </div>
</template>
