<script setup lang="ts">
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEvaluatorStore } from "@/store/evaluator.store";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const projectId = Number(route.params.project);

const store = useEvaluatorStore();
const { roles } = storeToRefs(store);

const selected = ref<number[]>([]);
</script>

<template>
  <div class="flex flex-col">
    <Label class="my-1">Select Roles to evaluate</Label>
    <div class="flex flex-wrap">
      <div
        v-for="role in roles"
        :key="role.id"
        class="flex p-2 space-x-1 w-[250px]"
      >
        <Checkbox
          :id="`r${role.id}`"
          :checked="selected.includes(role.id)"
          @update:checked="
            (value) => {
              if (!value) {
                selected = selected.filter((e) => e != role.id);
                store.unsetRole(projectId, role.id);
              } else {
                selected = [...selected, role.id];
                store.setRole(projectId, role.id);
              }
            }
          "
        />
        <Label :for="`r${role.id}`" class="hover:cursor-pointer flex flex-col">
          <span class="text-md">{{ role.title }}</span>
          <p class="text-sm text-foreground-muted">{{ role.caption }}</p>
        </Label>
      </div>
      <!-- <div class="flex flex-wrap">
        <div v-for="role in roles" :key="role.id" class="w-1/6 py-2">
          <RoleCard
            :role="role"
            class="h-full"
            :class="{
              'bg-primary text-primary-foreground': selected.includes(role.id),
              'hover:bg-muted': !selected.includes(role.id),
            }"
            @click="
              () => {
                if (selected.includes(role.id)) {
                  selected = selected.filter((e) => e != role.id);
                  store.unsetRole(projectId, role.id);
                } else {
                  selected = [...selected, role.id];
                  store.setRole(projectId, role.id);
                }
              }
            "
          />
        </div>
      </div> -->
    </div>
  </div>
</template>
