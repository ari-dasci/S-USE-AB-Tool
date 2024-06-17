<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WatchErrors } from "@/composables/watch-errors";
import { useProjectsStore } from "@/store/projects.store";
import { ChevronLeft as BackIcon } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const store = useProjectsStore();
const { project } = storeToRefs(store);

const route = useRoute();
const router = useRouter();

onMounted(() => {
  store.getProject(Number(route.params.id));
});

WatchErrors(store);

const onClick = (r: string) =>
  router.replace({ name: r, params: route.params });
</script>

<template>
  <Tabs
    :model-value="$route.matched[1].name?.toString()"
    @update:model-value="onClick"
    class="h-full flex flex-col"
  >
    <header
      class="flex h-16 z-40 top-0 items-center px-4 border-b sticky border-border bg-background justify-between"
    >
      <nav class="flex items-center space-x-2">
        <router-link to="/">
          <BackIcon />
        </router-link>
        <h6 class="text-2xl font-bold tracking-tight p-2">
          {{ project?.name }}
        </h6>
      </nav>
      <div class="flex items-center">
        <TabsList class="my-2">
          <TabsTrigger
            class="capitalize"
            v-for="route in $route.matched[0].children"
            :value="route.name!.toString()"
            :key="route.name"
          >
            {{ route.name?.toString().split(".").at(-1) }}
          </TabsTrigger>
        </TabsList>
      </div>
    </header>
    <div
      class="flex-1 justify-center items-center h-full w-full container bg-background"
    >
      <router-view></router-view>
    </div>
  </Tabs>
</template>
