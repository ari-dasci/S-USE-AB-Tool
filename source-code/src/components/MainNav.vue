<script setup lang="ts">
import { cn } from "@/lib/utils";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();

const childrenRoutes = route.matched[0].children.filter((r) => r.name != null);
</script>

<template>
  <nav
    :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')"
  >
    <h3 class="text-3xl font-bold tracking-tight">UseABTool</h3>
    <router-link
      v-for="l in childrenRoutes"
      :to="l.path"
      class="text-sm capitalize font-medium transition-colors hover:text-primary"
      :class="{ 'text-muted-foreground ': $route.name != l.name }"
    >
      {{ l.name }}
    </router-link>
  </nav>
</template>
