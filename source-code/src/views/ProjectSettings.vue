<script setup lang="ts">
import SidebarNav from "@/components/SidebarNav.vue";
import { Separator } from "@/components/ui/separator";
import { WatchErrors } from "@/composables/watch-errors";
import { useProjectsStore } from "@/store/projects.store";
import { storeToRefs } from "pinia";

const store = useProjectsStore();
const { project } = storeToRefs(store);

WatchErrors(store);
</script>

<template>
  <div class="space-y-6 block py-2">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
      <p class="text-muted-foreground">
        Manage your project settings and set preferences.
      </p>
    </div>
    <Separator class="my-6" />
    <div class="flex flex-row space-x-12 space-y-0 h-full w-full">
      <aside class="-mx-4 flex-1 max-w-sm border-r pr-1 h-full">
        <SidebarNav />
      </aside>
      <div v-if="project != null" class="w-4/5">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
