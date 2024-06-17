<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Alternative } from "@/models/alternative.model";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontalIcon } from "lucide-vue-next";
import { ref } from "vue";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog.vue";

import { PencilIcon, Trash2Icon } from "lucide-vue-next";

const { alternative } = defineProps<{ alternative: Alternative }>();

const confimationDialogOpened = ref(false);

const emit = defineEmits<{
  edit: [value: Alternative];
  delete: [value: number];
}>();
</script>

<template>
  <Card>
    <div class="flex justify-between items-center p-4">
      <div class="flex items-center space-x-2">
        <Avatar>
          <AvatarImage
            v-if="alternative.logo"
            :src="alternative.logo.toString()"
          />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
        <div class="space-y-1">
          <p class="text-sm font-medium leading-none">
            {{ alternative.alias }}
          </p>
          <a
            :href="alternative.url"
            target="_blank"
            class="text-sm text-muted-foreground hover:text-primary"
          >
            {{ alternative.url }}
          </a>
        </div>
      </div>
      <DeleteConfirmationDialog
        v-model:open="confimationDialogOpened"
        @closed="(value) => value && emit('delete', alternative.id)"
      >
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="ghost"
              class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <MoreHorizontalIcon class="h-4 w-4" />
              <span class="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-[160px]">
            <DropdownMenuItem @click="emit('edit', alternative)">
              <div class="flex space-x-1">
                <PencilIcon />
                <div>Edit</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem @click="() => (confimationDialogOpened = true)">
              <div class="flex space-x-1 text-destructive">
                <Trash2Icon />
                <div>Delete</div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DeleteConfirmationDialog>
    </div>
  </Card>
</template>
