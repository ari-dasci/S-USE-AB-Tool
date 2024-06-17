<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  open: boolean;
}>();
const emit = defineEmits<{
  "update:open": [value: boolean];
  closed: [value: boolean];
}>();
const data = useVModel(props, "open", emit);
</script>

<template>
  <Dialog v-model:open="data">
    <slot></slot>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription> This action cannot be undone. </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant="outline"
          @click="
            () => {
              emit('closed', false);
              data = false;
            }
          "
          >Cancel</Button
        >
        <Button
          @click="
            () => {
              emit('closed', true);
              data = false;
            }
          "
          variant="destructive"
          >Continue</Button
        >
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
