<script setup lang="ts">
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
const value = defineModel<number[]>();
</script>

<template>
  <div class="lg:w-1/2 w-full p-1">
    <Card>
      <div class="flex items-center space-x-2 justify-between p-4">
        <div class="flex flex-col items-center mr-8">
          <slot />
        </div>
        <Slider
          v-model="value"
          :default-value="[0]"
          :min="0"
          :max="100"
          :step="1"
          class="hover:cursor-pointer"
        />
        <div class="p-6 w-[100px] text-center">
          {{ value && value[0] }}
        </div>
      </div>
    </Card>
  </div>
</template>
