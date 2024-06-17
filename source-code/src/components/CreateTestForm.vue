<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TestFormData, testFormSchema } from "@/models/test.model";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

const validationSchema = toTypedSchema(testFormSchema);

const { handleSubmit } = useForm({
  validationSchema,
});

const emit = defineEmits<{ submit: [value: TestFormData] }>();
const { error } = defineProps<{ error?: string }>();

const onSubmit = handleSubmit((data) => {
  console.log(data);
  emit("submit", data);
});
</script>

<template>
  <form @submit="onSubmit" class="space-y-3">
    <FormField v-slot="{ componentField }" name="alias">
      <FormItem>
        <FormLabel>Alias </FormLabel>
        <FormControl>
          <Input type="text" placeholder="alias" v-bind="componentField" />
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

    <FormField v-slot="{ componentField }" name="instructions">
      <FormItem>
        <FormLabel>Instructions</FormLabel>
        <FormControl>
          <Textarea
            placeholder="add the instructions"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="type">
      <FormItem>
        <FormLabel>Type</FormLabel>
        <Select v-bind="componentField" default-value="1">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a value" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="QUESTIONNAIRE"> questionnaire </SelectItem>
                <SelectItem value="TEST"> test </SelectItem>
              </SelectGroup>
            </SelectContent>
          </FormControl>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <p class="text-sm font-medium text-destructive">{{ error }}</p>
    <Button type="submit"> Save </Button>
  </form>
</template>
