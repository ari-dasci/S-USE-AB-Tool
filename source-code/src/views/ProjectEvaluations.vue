<script setup lang="ts">
import TestQuestions from "@/components/TestQuestions.vue";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import SheetDescription from "@/components/ui/sheet/SheetDescription.vue";
import { useTestStore } from "@/store/tests.store";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useTestStore();

const { selectedTests } = storeToRefs(store);

const projectId = computed(() => Number(route.params!.id));
const selectedId = ref<number>();

onMounted(() => {
  store.getTests();
  store.getSelectedByProject(projectId.value);
});
</script>

<template>
  <Sheet
    :open="selectedId != undefined"
    @update:open="(value) => !value && (selectedId = undefined)"
  >
    <div class="w-full flex flex-wrap">
      <div class="w-1/2 p-2" v-for="test in selectedTests" :key="test.id">
        <Card
          class="hover:cursor-pointer hover:bg-muted"
          @click="() => (selectedId = test.id)"
        >
          <CardHeader>
            <CardTitle class="text-sm">{{ test.name }}</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>

    <SheetContent
      side="right"
      class="h-screen w-2/3 sm:w-full max-w-xl sm:max-w-xl flex flex-col"
    >
      <SheetTitle> </SheetTitle>
      <SheetDescription> </SheetDescription>
      <TestQuestions
        class="flex-1"
        v-if="selectedId"
        :testId="selectedId"
        :key="selectedId"
      />
    </SheetContent>
  </Sheet>
</template>
