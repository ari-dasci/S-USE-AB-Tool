<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { Alternative } from "@/models/alternative.model";
import { Test } from "@/models/test.model";
import { CheckIcon } from "lucide-vue-next";
import { ref, toRaw, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const projectId = Number(route.params.project);

const { alternative, tests } = defineProps<{
  alternative: Alternative;
  tests: Test[];
}>();
const answered = ref(new Set<number>());

watch(
  () => alternative.testStatus,
  (status) => {
    const value = toRaw(status);
    for (const k in value) {
      const i = Number(k);
      const v = value[i];
      if (v === 'ANSWERED') {
        answered.value.add(i);
      }
    }
  }, { immediate: true }
);



const openTab = (href: string, id: number) => {
  const w = window.open(href, "_blank");
  window.addEventListener("message", (event) => {
    if (event.source !== w) return;
    if (event.data.submitted == true) {
      answered.value.add(id);
      toast({
        title: "Thank you",
        description: "Your answers was saved",
      });
    }
  });
};
</script>

<template>
  <div class="flex">
    <Avatar>
      <AvatarImage v-if="alternative.logo" :src="alternative.logo.toString()" />
      <AvatarFallback></AvatarFallback>
    </Avatar>
    <div class="flex flex-col m-3">
      <Label class="text-xl">
        {{ alternative.alias }}
      </Label>
      <a class="text-sm hover:text-primary" :href="alternative.url" target="_blank">
        {{ alternative.url }}
      </a>
    </div>
  </div>

  <div class="flex flex-wrap">
    <div v-for="test in tests" :key="test.id" class="w-1/4">
      <Card class="m-1" :class="{
        'bg-primary text-white': answered.has(test.id),
        'hover:bg-muted hover:cursor-pointer': !answered.has(test.id),
      }" @click="() => {
        if (answered.has(test.id)) return;
        openTab(
          `#/evaluate/${projectId}/alternative/${alternative.id}/test/${test.id}`,
          test.id
        );
      }
        ">
        <CardHeader>
          <div class="flex justify-between">
            <div class="w-3/4">
              <CardTitle class="text-md">{{ test.name }}</CardTitle>
            </div>
            <CheckIcon v-if="answered.has(test.id)" />
          </div>
        </CardHeader>
      </Card>
    </div>
  </div>
</template>
