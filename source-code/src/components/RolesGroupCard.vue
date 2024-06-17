<script setup lang="ts">
import RoleCard from "@/components/RoleCard.vue";

import { RoleCategory } from "@/models/role.model";
import { watchDebounced } from "@vueuse/core";
import { EarOff, EyeOff, Hand, Icon, Speech } from "lucide-vue-next";
import { ref, toRefs } from "vue";
import Slider from "./ui/slider/Slider.vue";

const icons: { [key: string]: Icon } = {
  speak: Speech,
  hear: EarOff,
  touch: Hand,
  visual: EyeOff,
};

const props = defineProps<{
  category: RoleCategory;
  initialSelected: number[];
  initialScale: number;
}>();
const { category } = toRefs(props);

const emit = defineEmits<{
  "update:checked": [id: number, selected: boolean];
  "update:scale": [value: number];
}>();

const selected = ref<number[]>(props.initialSelected);
const scale = ref<number[]>([props.initialScale]);

watchDebounced(
  scale,
  () => {
    emit("update:scale", scale.value[0]);
  },
  {
    debounce: 1000,
  }
);
</script>

<template>
  <div class="flex p-3 space-x-2">
    <div class="text-lg font-bold capitalize">
      {{ category.caption }}
    </div>
    <component
      v-if="category.caption.toLowerCase() in icons"
      :is="icons[category.caption.toLowerCase()]"
    ></component>
  </div>
  <div v-if="category.roles?.length" class="flex">
    <RoleCard
      v-for="role in category.roles"
      :role="role"
      class="flex-grow flex-1"
      :class="{
        [`text-white bg-primary`]: selected.includes(role.id),
      }"
      @click="
        () => {
          const checked = selected.includes(role.id);
          if (checked) {
            selected = selected.filter((e) => e !== role.id);
          } else {
            selected = [...selected, role.id];
          }
          emit('update:checked', role.id, !checked);
        }
      "
    />
  </div>
  <div class="flex items-center space-x-2 justify-around p-4">
    <Slider :min="0" :max="100" :step="1" v-model="scale" />
    <div class="w-[100px]">
      {{ scale && scale[0] }}
    </div>
  </div>
</template>
