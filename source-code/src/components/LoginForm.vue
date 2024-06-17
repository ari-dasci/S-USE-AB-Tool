<script setup lang="ts">
import LoadingButton from "@/components/LoadingButton.vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth.store";
import { storeToRefs } from "pinia";

const store = useAuthStore();

const { isLoading } = storeToRefs(store);

const validationSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(5).max(20),
  })
);

const form = useForm({
  validationSchema,
});

const onSubmit = form.handleSubmit(async ({ email, password }) => {
  await store.login(email, password);
});
</script>

<template>
  <form @submit="onSubmit" class="space-y-2">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email </FormLabel>
        <FormControl>
          <Input type="email" placeholder="email" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password </FormLabel>
        <FormControl>
          <Input
            type="password"
            placeholder="password"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="p-2"></div>
    <LoadingButton type="submit" :is-loading="isLoading">
      <div class="ml-2">Log In</div>
    </LoadingButton>
  </form>
</template>
