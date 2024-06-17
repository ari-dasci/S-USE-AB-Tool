<script setup lang="ts">
import CreateTestForm from "@/components/CreateTestForm.vue";
import TestCard from "@/components/TestCard.vue";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TestFormData } from "@/models/test.model";
import { useTestStore } from "@/store/tests.store";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const store = useTestStore();

onMounted(() => {
  store.getTests();
});

const { tests } = storeToRefs(store);

const open = ref(false);

const onSubmit = async (data: TestFormData) => {
  await store.createTest(data);
  open.value = false;
};
</script>

<template>
  <Sheet v-model:open="open">
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>New Test</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
      <CreateTestForm @submit="onSubmit" />
    </SheetContent>
    <div class="container py-2">
      <div class="flex items-center justify-between space-y-2">
        <h6 class="text-2xl font-bold tracking-tight p-2">Tests</h6>
        <div class="flex items-center space-x-2">
          <SheetTrigger>
            <Button variant="outline"
              ><span class="material-icons">add</span> Add</Button
            >
          </SheetTrigger>
        </div>
      </div>
      <Separator class="my-1" />
      <div class="grid items-center grid-cols-4">
        <div v-for="test in tests" :key="test.id">
          <TestCard :test="test" />
        </div>
      </div>
    </div>
  </Sheet>
</template>
