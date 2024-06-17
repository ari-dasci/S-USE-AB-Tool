<script setup lang="ts">
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-vue-next";
import { PrimitiveProps } from "radix-vue";
import { toRefs } from "vue";

interface Props extends PrimitiveProps {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>["variant"];
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>["size"];
  as?: string;
}

const props = defineProps<Props & { isLoading: boolean }>();
const { isLoading } = toRefs(props);
</script>

<template>
  <Button
    :disabled="isLoading"
    v-bind="props"
    :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')"
    ><Loader2
      :class="{ 'animate-spin ': isLoading, hidden: !isLoading }"
      class="mr-2"
    />
    <slot />
  </Button>
</template>
