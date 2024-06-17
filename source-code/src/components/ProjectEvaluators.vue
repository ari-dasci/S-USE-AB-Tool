<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useProjectsStore } from "@/store/projects.store";
import {
  GraduationCapIcon,
  Icon,
  MoreHorizontalIcon,
  PlusIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import AddProjectEvaluatorForm from "./AddProjectEvaluatorForm.vue";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog.vue";

const icons: { [key: string]: Icon } = {
  expert: GraduationCapIcon,
  user: UserIcon,
};

const store = useProjectsStore();

const { project } = storeToRefs(store);

const open = ref(false);

const onDelete = ref();

onMounted(async () => {
  await store.getEvaluators();
});
</script>

<template>
  <Dialog v-model:open="open">
    <div class="space-y-2">
      <div class="flex justify-between items-end">
        <Label> Evaluators </Label>
        <DialogTrigger>
          <Button variant="outline"><PlusIcon /> Add User </Button>
        </DialogTrigger>
      </div>

      <div class="border rounded-lg max-h-[300px] overflow-auto">
        <DeleteConfirmationDialog
          :open="onDelete != undefined"
          @closed="(value: boolean) => {
          if(value){
            store.unenroll(onDelete);
          }
          onDelete = undefined;
        }"
        >
        </DeleteConfirmationDialog>
        <Table>
          <TableCaption v-if="!project?.evaluators"
            >A list of the project evaluators</TableCaption
          >
          <TableHeader class="sticky">
            <TableRow>
              <TableHead>Fullname</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead> Role </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody class="max-h-[400px] overflow-auto">
            <TableRow
              v-for="evaluator in project?.evaluators"
              :key="evaluator.user"
            >
              <TableCell class="font-medium">{{
                evaluator.fullname
              }}</TableCell>
              <TableCell>{{ evaluator.email }}</TableCell>
              <TableCell>{{ evaluator.organization }}</TableCell>
              <TableCell>
                <div class="flex space-x-1">
                  <component
                    :is="icons[evaluator.role.toLocaleLowerCase()]"
                  ></component>
                  <div class="lowercase">{{ evaluator.role }}</div>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button
                      variant="outline"
                      class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                      <MoreHorizontalIcon class="h-4 w-4" />
                      <span class="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" class="w-[160px]">
                    <DropdownMenuItem
                      class="text-destructive space-x-1"
                      @click="onDelete = evaluator.user"
                    >
                      <Trash2Icon />
                      <div>Delete</div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add User</DialogTitle>
        <DialogDescription>
          Add an evaluator for the project
        </DialogDescription>
      </DialogHeader>
      <AddProjectEvaluatorForm @submit="open = false" />
    </DialogContent>
  </Dialog>
</template>
