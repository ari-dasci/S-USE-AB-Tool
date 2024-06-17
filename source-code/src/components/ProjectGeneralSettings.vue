<script setup lang="ts">
import { ProjectFormData } from "@/models/project.model";
import { useProjectsStore } from "@/store/projects.store";
import { storeToRefs } from "pinia";
import CreateProjectForm from "./CreateProjectForm.vue";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ref } from "vue";

const store = useProjectsStore();
const { project, isLoading } = storeToRefs(store);

const openSheet = ref(false);

const onSubmit = async (value: ProjectFormData) => {
  await store.updateProject(value);
  openSheet.value = store.error === undefined;
};
</script>

<template>
  <Sheet v-model:open="openSheet">
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>Edit project</SheetTitle>
        <SheetDescription></SheetDescription>
      </SheetHeader>
      <CreateProjectForm
        :is-loading="isLoading"
        :initial-values="project"
        @submit="onSubmit"
      />
    </SheetContent>
    <SheetTrigger>
      <Button>Edit Project</Button>
    </SheetTrigger>
  </Sheet>
</template>
