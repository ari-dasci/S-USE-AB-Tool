<script setup lang="ts">
import SidebarNav from "@/components/SidebarNav.vue";
import { Separator } from "@/components/ui/separator";
</script>

<template>
  <div class="space-y-6 block container py-2">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
      <p class="text-muted-foreground">
        Manage your project settings and set preferences.
      </p>
    </div>
    <Separator class="my-6" />
    <div class="flex flex-row space-x-12 space-y-0 h-full">
      <aside class="-mx-4 w-1/5 border-r pr-1 h-full">
        <SidebarNav />
      </aside>
      <div class="flex-1 max-w-2xl">
        <div class="space-y-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
