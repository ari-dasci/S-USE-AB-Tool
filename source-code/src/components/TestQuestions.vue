<script setup lang="ts">
import { useTestStore } from "@/store/tests.store";
import { storeToRefs } from "pinia";
import { h, onMounted } from "vue";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { toast } from "./ui/toast";

const validationSchema = toTypedSchema(
  z.object({
    values: z.array(z.string()),
  })
);

const { handleSubmit } = useForm({ validationSchema });

const store = useTestStore();
const { questions } = storeToRefs(store);

const { testId } = defineProps<{ testId: number }>();

onMounted(() => {
  store.getQuestions(testId);
});

const onSubmit = handleSubmit((value) => {
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(value, null, 2))
    ),
  });
});
</script>

<template>
  <div class="h-full flex flex-col py-4">
    <div class="overflow-auto flex-1 flex-grow py-4 pr-3">
      <form @submit="onSubmit" class="space-y-2">
        <Card v-for="(item, index) in questions">
          <FormField
            v-slot="{ componentField }"
            type="radio"
            :name="`values[${index}]`"
          >
            <FormItem class="space-y-3">
              <CardHeader>
                <FormLabel> {{ index + 1 }}. {{ item.title }}</FormLabel>
              </CardHeader>
              <CardContent>
                <FormControl>
                  <RadioGroup
                    class="flex flex-col space-y-1"
                    v-bind="componentField"
                  >
                    <FormItem
                      v-for="index in 5"
                      class="flex items-center space-y-0 gap-x-3"
                    >
                      <FormControl>
                        <RadioGroupItem :value="index.toString()" />
                      </FormControl>
                      <FormLabel class="font-normal">
                        {{ index }}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </CardContent>
              <CardFooter>
                <FormMessage />
              </CardFooter>
            </FormItem>
          </FormField>
        </Card>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  </div>
</template>
