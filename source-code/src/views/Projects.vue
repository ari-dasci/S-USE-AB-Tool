<script setup lang="ts">
import CreateProjectForm from "@/components/CreateProjectForm.vue";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WatchErrors } from "@/composables/watch-errors";
import { ProjectFormData } from "@/models/project.model";
import { useProjectsStore } from "@/store/projects.store";
import { Plus as PlusIcon } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const store = useProjectsStore();
const { isLoading } = storeToRefs(store);
const openSheet = ref(false);

WatchErrors(store);

const onSubmit = async (value: ProjectFormData) => {
  await store.createProject(value);
  openSheet.value = store.error !== undefined;
};
</script>

<template>
  <Sheet v-model:open="openSheet">
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>New project</SheetTitle>
        <SheetDescription> Create a new project </SheetDescription>
      </SheetHeader>
      <CreateProjectForm :is-loading="isLoading" @submit="onSubmit" />
    </SheetContent>
    <Tabs
      :modelValue="$route.matched[2].name?.toString()"
      @update:modelValue="(v) => $router.replace({ name: v })"
    >
      <div class="container py-2">
        <div class="flex items-center justify-between space-y-2">
          <div class="flex">
            <h6 class="text-2xl font-bold tracking-tight p-2 text-current">
              Projects
            </h6>
            <TabsList class="my-2">
              <TabsTrigger class="capitalize" value="projectsList">
                My projects
              </TabsTrigger>
              <TabsTrigger class="capitalize" value="evaluatorProjectsList">
                Evaluator projects
              </TabsTrigger>
            </TabsList>
          </div>
          <div class="flex">
            <div class="flex items-center space-x-2">
              <SheetTrigger v-if="$route.matched[2].name === 'projectsList'">
                <Button variant="outline"><PlusIcon>add</PlusIcon> Add</Button>
              </SheetTrigger>
            </div>
          </div>
        </div>
        <Separator class="my-1" />
        <router-view />
      </div>
    </Tabs>
  </Sheet>
</template>
