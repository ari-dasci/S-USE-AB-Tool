<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Alternative, AlternativeFormData } from "@/models/alternative.model";
import { useProjectsStore } from "@/store/projects.store";
import { PlusIcon } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import AlternativeCard from "./AlternativeCard.vue";
import LoadingOverlay from "./LoadingOverlay.vue";
import AlternativeForm from "./ui/AlternativeForm.vue";

const store = useProjectsStore();
const { project, isLoading } = storeToRefs(store);

const alternatives = computed(() => project?.value?.alternatives);
const openSheet = ref(false);
const editing = ref<Alternative>();

onMounted(async () => {
  await store.getAlternatives();
});

const onEdit = (alternative: Alternative) => {
  editing.value = alternative;
  openSheet.value = true;
};
const onDelete = async (id: number) => {
  console.log(id);
  await store.deleteAlternative(id);
};
const onSubmit = async (value: AlternativeFormData) => {
  if (editing.value == null) {
    await store.addAlternative(value);
  } else {
    await store.updateAlternative(editing.value.id, value);
  }
  openSheet.value = false;
};
</script>

<template>
  <Sheet
    v-model:open="openSheet"
    @update:open="(value) => !value && (editing = undefined)"
  >
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>{{ editing ? "Edit" : "Add" }} alternative</SheetTitle>
        <SheetDescription></SheetDescription>
      </SheetHeader>
      <AlternativeForm
        @submit="onSubmit"
        :initial-values="editing"
        :is-loading="isLoading"
      >
        {{ editing ? "Edit" : "Create" }}
      </AlternativeForm>
    </SheetContent>
    <div class="space-y-4">
      <div class="flex space-x-2 justify-between">
        <div class="flex-col">
          <Label>Alternatives</Label>
          <p class="text-sm">List of alternatives for this project</p>
        </div>
        <SheetTrigger>
          <Button variant="outline"><PlusIcon>add</PlusIcon> Add</Button>
        </SheetTrigger>
      </div>
      <LoadingOverlay
        class="space-y-1"
        :is-loading="isLoading && alternatives === undefined"
      >
        <div class="flex flex-wrap">
          <div
            v-for="alternative in alternatives"
            :key="alternative.id"
            class="w-1/2 lg:w-1/3 p-1"
          >
            <AlternativeCard
              :alternative="alternative"
              @edit="onEdit"
              @delete="onDelete"
            />
          </div>
        </div>
      </LoadingOverlay>
    </div>
  </Sheet>
</template>
