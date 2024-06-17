<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-vue-next";
import { toRefs } from "vue";

const props = defineProps<{ isLoading: boolean }>();
const { isLoading } = toRefs(props);
</script>

<template>
  <div :class="cn('flex justify-center items-center', $attrs.class ?? '')">
    <div
      class="w-full h-full"
      :class="{ 'blur-sm pointer-events-none': isLoading }"
    >
      <slot />
    </div>
    <Loader2 v-if="isLoading" class="z-40 animate-spin absolute" />
  </div>
</template>
