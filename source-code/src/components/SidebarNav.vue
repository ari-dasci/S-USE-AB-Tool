<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRoute } from "vue-router";

const route = useRoute();
const children = route.matched[1].children.filter((e) => !e.redirect);
</script>

<template>
  <nav class="flex flex-col space-x-0 space-y-1 h-full">
    <Button
      v-for="item in children"
      :key="item.name"
      as="Button"
      variant="ghost"
      :class="
        cn(
          'w-full text-left justify-start',
          $route.name === item.name && 'bg-muted hover:bg-muted'
        )
      "
      @click="$router.replace({ name: item.name })"
    >
      {{ item.meta!.title }}
    </Button>
  </nav>
</template>
