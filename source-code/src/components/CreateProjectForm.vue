<script setup lang="ts">
import DateRangePicker from "@/components/DateRangePicker.vue";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Project, ProjectFormData } from "@/models/project.model";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toRefs } from "vue";
import { z } from "zod";
import ImagePicker from "./ImagePicker.vue";
import LoadingButton from "./LoadingButton.vue";

const validationSchema = toTypedSchema(
  z.object({
    pic: z.string().url(),
    name: z.string(),
    // description: z.string(),
    availability: z.object({
      start: z.date(),
      end: z.date(),
    }),
  })
);

const props = defineProps<{
  isLoading?: boolean;
  initialValues?: Project;
}>();
const { isLoading = false } = toRefs(props);
const { initialValues } = props;

const form = useForm({
  validationSchema,
  initialValues: {
    ...initialValues,
    pic: initialValues?.pic?.toString(),
    availability: {
      start: initialValues?.begin && new Date(initialValues.begin),
      end: initialValues?.end && new Date(initialValues.end),
    },
  },
});

const emits = defineEmits<{ submit: [value: ProjectFormData] }>();

const onSubmit = form.handleSubmit(async ({ availability, ...data }) => {
  emits("submit", {
    ...data,
    begin: availability.start,
    end: availability.end,
  });
});
</script>

<template>
  <div class="my-2"></div>
  <form @submit="onSubmit" class="space-y-2 content-start">
    <FormField v-slot="{ handleChange, value }" name="pic">
      <FormItem>
        <FormLabel>logo</FormLabel>
        <FormControl>
          <ImagePicker
            v-bind:default-value="value"
            @update:model-value="handleChange"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name </FormLabel>
        <FormControl>
          <Input type="text" placeholder="Name" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="availability">
      <FormItem>
        <FormLabel>Pick a date range</FormLabel>
        <FormControl>
          <DateRangePicker
            v-bind="{ ...componentField, minDate: Date.now() }"
            class="w-full"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <LoadingButton :is-loading="isLoading" type="submit" class="py-3"
      >{{
        initialValues === undefined ? "Create" : "Edit"
      }}
      Project</LoadingButton
    >
  </form>
</template>
