<script setup lang="ts">
import TestQuestions from "@/components/TestQuestions.vue";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTestStore } from "@/store/tests.store";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const store = useTestStore();

const { tests } = storeToRefs(store);

const selectedId = ref<number | undefined>();

onMounted(() => {
  store.getTests();
});
</script>

<template>
  <Sheet>
    <SheetContent
      side="right"
      class="w-2/3 sm:w-full max-w-md sd:max-w-md flex flex-col"
    >
      <TestQuestions v-if="selectedId != undefined" :test-id="selectedId" />
    </SheetContent>

    <div class="w-full flex flex-wrap">
      <SheetTrigger v-for="test in tests" :key="test.id" as-child>
        <div class="w-1/2 p-2">
          <Card
            class="hover:cursor-pointer hover:bg-muted"
            @click="() => (selectedId = test.id)"
          >
            <CardHeader>
              <CardTitle class="text-sm">{{ test.name }}</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </SheetTrigger>
    </div>
  </Sheet>
</template>
