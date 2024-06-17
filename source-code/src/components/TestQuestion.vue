<script setup lang="ts">
import { FormField } from "@/components/ui/form";
import {
  AngryIcon,
  FrownIcon,
  LaughIcon,
  MehIcon,
  SmileIcon,
} from "lucide-vue-next";

const faceIcons = [AngryIcon, FrownIcon, MehIcon, SmileIcon, LaughIcon];

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { EvaluationTypes, TestQuestion } from "@/models/test.model";
import { useIntervalFn } from "@vueuse/core";
import { useField } from 'vee-validate';
import { computed, ref } from "vue";
import FormDescription from "./ui/form/FormDescription.vue";

const { index, question, type } = defineProps<{
  index: number;
  question: TestQuestion;
  type: EvaluationTypes;
}>();

const time = ref(0);

const formattedTime = computed(() => {
  const minutes = Math.floor(time.value / 60);
  const seconds = time.value % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

if (type === 'USABILITY') {
  const timeField = useField(`answers[${index}].time`);
  useIntervalFn(() => {
    time.value++;
    timeField.setValue(time.value);
  }, 1000, { immediate: true },);
}



</script>

<template>
  <Card class="m-2">
    <FormField :name="`answers[${index}]`">
      <FormItem>
        <CardHeader>
          <div class="flex justify-between">
            <div class="flex flex-col">
              <FormLabel> {{ question.index }}. {{ question.title }}</FormLabel>
              <FormDescription> {{ question.category }}</FormDescription>
            </div>
            <div class="flex items-end" v-if="type === 'USABILITY'">
              <FormLabel>{{ formattedTime }}</FormLabel>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <FormField v-slot="{ componentField }" type="radio" :name="`answers[${index}].value`">
              <FormItem>
                <FormControl>
                  <RadioGroup :class="{ 'flex-col': question.answers.length <= 5 }" class="flex flex-wrap space-y-1 m-2"
                    v-bind="componentField">
                    <FormItem v-for="(answer, i) in question.answers" :key="`${index}.${i}`"
                      class="flex items-center space-y-0 gap-x-3">
                      <FormControl>
                        <RadioGroupItem :value="answer.value?.toString()" />
                        <FormLabel class="font-normal flex flex-col items-center hover:cursor-pointer">
                          <span>{{ answer.title }}</span>
                          <component v-if="type === 'NPS'" :is="faceIcons[Math.floor(i / 2)]" />
                        </FormLabel>
                      </FormControl>
                    </FormItem>
                  </RadioGroup>
                  <FormMessage />
                </FormControl>
              </FormItem>
            </FormField>
            <FormField v-if="type === 'USABILITY'" v-slot="{ value, handleChange }" type="checkbox"
              :name="`answers[${index}].success`">
              <FormItem class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox :checked="value" @update:checked="handleChange" :default-checked="true" />
                </FormControl>
                <div class="space-y-1 leading-none hover:cursor-pointer">
                  <FormLabel>can you complete this activity?</FormLabel>
                  <!-- <FormDescription>
                    You can manage your mobile notifications in the
                  </FormDescription> -->
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>
          </div>
        </CardContent>
        <CardFooter>
          <FormMessage />
        </CardFooter>
      </FormItem>
    </FormField>
  </Card>
</template>
