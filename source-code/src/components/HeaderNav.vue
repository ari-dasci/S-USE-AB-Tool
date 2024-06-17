<script setup lang="ts">
import UserNav from "@/components/UserNav.vue";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useTitle } from "@vueuse/core";
import { useRoute } from "vue-router";

const docTitle = useTitle();

const route = useRoute();

const childrenRoutes = route.matched[0].children.filter((r) => r.name != null);
</script>

<template>
  <header
    :class="
      cn(
        'flex h-16 z-40 top-0 items-center px-4 border-b sticky border-border bg-background',
        $attrs.class ?? ''
      )
    "
  >
    <nav class="flex items-center space-x-2">
      <router-link to="/" class="mr-4">
        <div class="flex gap-2">
          <img class="max-h-10" src="@/assets/logo.png" alt="" />
          <h3 class="text-3xl font-bold tracking-tight">{{ docTitle }}</h3>
        </div>
      </router-link>
      <Button
        v-for="l in childrenRoutes"
        :variant="
          $route.matched.some((e) => e.name == l.name) ? 'default' : 'ghost'
        "
        class="text-sm capitalize font-medium transition-colors hover:text-muted-foreground hover:bg-muted"
        @click="$router.replace({ name: l.name })"
      >
        {{ l.name }}
      </Button>
    </nav>
    <div class="ml-auto flex items-center space-x-4">
      <UserNav />
    </div>
  </header>
</template>
