<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DateRange = { start: Date; end: Date };

const props = defineProps<{
  defaultValue?: DateRange;
  modelValue?: DateRange;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: DateRange): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <div :class="cn('grid gap-2', $attrs.class ?? '')">
    <Popover>
      <PopoverTrigger as-child>
        <Button
          id="date"
          :variant="'outline'"
          :class="
            cn(
              'w-[260px] justify-start text-left font-normal',
              !props && 'text-muted-foreground'
            )
          "
        >
          <CalendarIcon class="mr-2 h-4 w-4" />

          <span v-if="modelValue && modelValue.start">
            <span>{{ format(modelValue.start, "LLL dd, y") }}</span>
            <span v-if="modelValue.end">
              - {{ format(modelValue.end, "LLL dd, y") }}</span
            >
          </span>
          <span v-else>Pick a date</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0" align="end" :avoid-collisions="true">
        <Calendar v-bind="$attrs" v-model.range="modelValue" :columns="2" />
      </PopoverContent>
    </Popover>
  </div>
</template>
