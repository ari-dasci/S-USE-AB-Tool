<script setup lang="ts">
import LoadingButton from "@/components/LoadingButton.vue";
import { DialogFooter } from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProjectsStore } from "@/store/projects.store";
import { toTypedSchema } from "@vee-validate/zod";
import { storeToRefs } from "pinia";
import { useForm } from "vee-validate";
import { z } from "zod";
import UsersLookupComboBox from "./UsersLookupComboBox.vue";

import { GraduationCapIcon, UserIcon } from "lucide-vue-next";

const validationSchema = toTypedSchema(
  z.object({
    user: z.number(),
    role: z.enum(["USER", "EXPERT"]),
  })
);

const { handleSubmit } = useForm({
  validationSchema,
});

const store = useProjectsStore();
const { isLoading } = storeToRefs(store);

const emit = defineEmits(["submit"]);

const onSubmit = handleSubmit(async (data) => {
  await store.enroll(data);
  emit("submit");
});
</script>

<template>
  <form @submit="onSubmit">
    <div class="flex items-center space-x-2">
      <FormField v-slot="{ handleChange }" name="user">
        <FormItem class="flex-1">
          <FormLabel>User</FormLabel>
          <FormControl>
            <UsersLookupComboBox @select="handleChange" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="role">
        <FormItem>
          <FormLabel>Role</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">
                  <div class="flex space-x-1">
                    <UserIcon />
                    <div>user</div>
                  </div>
                </SelectItem>
                <SelectItem value="EXPERT">
                  <div class="flex space-x-1">
                    <GraduationCapIcon />
                    <div>expert</div>
                  </div>
                </SelectItem>
              </SelectContent>
            </FormControl>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <DialogFooter class="sm:justify-start">
      <LoadingButton :is-loading="isLoading" type="submit"> Add </LoadingButton>
    </DialogFooter>
  </form>
</template>
