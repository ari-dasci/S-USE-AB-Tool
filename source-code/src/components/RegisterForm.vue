<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

import LoadingButton from "@/components/LoadingButton.vue";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { unregisteredUserSchema } from "@/models/user.model";
import { useAuthStore } from "@/store/auth.store";
import { storeToRefs } from "pinia";
import ImagePicker from "./ImagePicker.vue";

const validationSchema = toTypedSchema(unregisteredUserSchema);

const store = useAuthStore();
const { isLoading } = storeToRefs(store);

const form = useForm({
  validationSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  await store.register(values);
});
</script>

<template>
  <form @submit="onSubmit" class="space-y-2">
    <FormField v-slot="{ handleChange }" name="profilePhoto">
      <FormItem>
        <FormLabel>Avatar</FormLabel>
        <FormControl>
          <ImagePicker @update:model-value="handleChange" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex w-full gap-1">
      <div class="flex-1">
        <FormField v-slot="{ componentField }" name="firstname">
          <FormItem>
            <FormLabel>Name </FormLabel>
            <FormControl>
              <Input type="text" placeholder="name" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="flex-1">
        <FormField v-slot="{ componentField }" name="lastname">
          <FormItem>
            <FormLabel>Surname </FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="surname"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </div>

    <FormField class="flex" v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email </FormLabel>
        <FormControl>
          <Input type="email" placeholder="email" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex w-full gap-1">
      <div class="flex-auto">
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
      </div>
      <div class="flex-auto">
        <FormField v-slot="{ componentField }" name="passwordConfirmation">
          <FormItem>
            <FormLabel>Confirm password </FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Confirm password"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </div>

    <FormField class="flex" v-slot="{ componentField }" name="organization">
      <FormItem>
        <FormLabel>Organization </FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Organization"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="p-2"></div>
    <LoadingButton :is-loading="isLoading" type="submit" class="w-full">
      <div class="ml-2">Submit</div>
    </LoadingButton>
  </form>
</template>
