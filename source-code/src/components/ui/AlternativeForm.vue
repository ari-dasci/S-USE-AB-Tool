<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import ImagePicker from "@/components/ImagePicker.vue";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { AlternativeFormData } from "@/models/alternative.model";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toRefs } from "vue";
import { z } from "zod";
import LoadingButton from "../LoadingButton.vue";

const props = defineProps<{
  initialValues?: AlternativeFormData;
  isLoading?: boolean;
}>();

const { isLoading } = toRefs(props);

const { initialValues } = props;

const validationSchema = toTypedSchema(
  z.object({
    alias: z.string(),
    url: z
      .string()
      .url()
      .refine((val) => /^https?:\/\/.*/g.test(val), {
        message: "Value must be a valid HTTP/HTTPS URL",
      }),
    visible: z.boolean(),
    logo: z.string(),
  })
);

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    ...initialValues,
    visible: initialValues?.visible ?? true,
    url: initialValues?.url.toString(),
    logo: initialValues?.logo,
  },
});

const emit = defineEmits<{ submit: [value: AlternativeFormData] }>();

const onSubmit = handleSubmit((data) => {
  emit("submit", data);
});
</script>

<template>
  <form @submit="onSubmit" class="space-y-2">
    <FormField v-slot="{ handleChange, value }" name="logo">
      <FormItem>
        <FormLabel>Logo </FormLabel>
        <FormControl>
          <ImagePicker
            :defaultValue="value"
            @update:modelValue="handleChange"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="alias">
      <FormItem>
        <FormLabel>Alias </FormLabel>
        <FormControl>
          <Input type="text" placeholder="alias" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="url">
      <FormItem>
        <FormLabel>Url </FormLabel>
        <FormControl>
          <Input type="text" placeholder="url" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="visible">
      <FormItem>
        <FormLabel>Visible </FormLabel>
        <FormControl>
          <Switch :checked="value" @update:checked="handleChange" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <LoadingButton :is-loading="isLoading ?? false" type="submit"
      ><slot></slot
    ></LoadingButton>
  </form>
</template>
