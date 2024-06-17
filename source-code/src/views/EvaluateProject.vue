<script setup lang="ts">
import EvaluateAlternative from "@/components/EvaluateAlternative.vue";
import SelectableRolesList from "@/components/ui/SelectableRolesList.vue";
import {
  Button
} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter
} from '@/components/ui/dialog';
import { WatchErrors } from "@/composables/watch-errors";
import { useEvaluatorStore } from "@/store/evaluator.store";
import { ChevronLeft as BackIcon } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const projectId = Number(route.params.project);

const store = useEvaluatorStore();
const { alternatives, tests, project } = storeToRefs(store);

WatchErrors(store);

onMounted(async () => {
  await store.getProject(projectId);
});
</script>

<template>
  <div>
    <header class="flex h-16 z-40 top-0 items-center px-4 border-b sticky border-border bg-background justify-between">
      <nav class="flex items-center space-x-2">
        <BackIcon @click="$router.back" />
        <h6 class="text-2xl font-bold tracking-tight p-2">
          {{ project?.name }}
        </h6>
      </nav>
      <div class="flex items-center"></div>
    </header>
    <div class="h-full container">

      <Dialog :open="!!store.project?.needsroleassignment">
        <DialogContent class="sm:max-w-[425px]">
          <SelectableRolesList />
          <DialogFooter>
            <Button type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div v-for="alternative in alternatives" :key="alternative.id" class="my-2 rounded-lg border bg-primary/5 p-3">
        <EvaluateAlternative :alternative="alternative" :tests="tests" />
      </div>
    </div>
  </div>
</template>
