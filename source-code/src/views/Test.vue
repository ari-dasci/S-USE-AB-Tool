<script setup lang="ts">
import LoadingButton from "@/components/LoadingButton.vue";
import TestQuestion from "@/components/TestQuestion.vue";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { WatchErrors } from "@/composables/watch-errors";
import { useEvaluatorStore } from "@/store/evaluator.store";
import { toTypedSchema } from "@vee-validate/zod";
import { storeToRefs } from "pinia";
import { useForm } from "vee-validate";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { z } from "zod";

const { params } = useRoute();

const store = useEvaluatorStore();

const { test, alternatives, questions, isLoading } = storeToRefs(store);

const alternative = computed(() =>
  alternatives.value?.find((e) => e.id === Number(params.alternative))
);

WatchErrors(store);

const validationSchema = toTypedSchema(
  z.object({
    answers: z
      .array(
        z.object({
          value: z.string(),
          time: z.number().optional(),
          success: z.boolean().optional().default(true),
        })
      )
      .refine(
        (values) => values.every((e) => e !== undefined),
        "all answers are required"
      ),
  })
);

const { handleSubmit, meta, errorBag, resetForm } = useForm({
  validationSchema,
});

const onSubmit = handleSubmit(async ({ answers }) => {
  const { project, alternative, test } = params;
  if (store.test?.type === "USABILITY") {
    const { questions } = store;
    const answer = answers[0];
    await store.saveAnswer(
      Number(project),
      Number(alternative),
      Number(test),
      questions[currentIndex.value].index,
      answer
    );
    resetForm();
    if (store.error === undefined) {
      currentIndex.value = currentIndex.value + 1;
    }
    if (currentIndex.value >= questions.length) {
      window.onbeforeunload = null;
      window.opener.postMessage({ submitted: true }, document.referrer);
      window.close();
    }
  } else {
    await Promise.allSettled(
      answers.map((value, index) =>
        store.saveAnswer(
          Number(project),
          Number(alternative),
          Number(test),
          questions.value[index].index,
          value
        )
      )
    );
    if (store.error === undefined) {
      window.onbeforeunload = null;
      window.opener.postMessage({ submitted: true }, document.referrer);
      window.close();
    }
  }
});

function confirmExit() {
  if (meta.value.dirty) {
    return "You have attempted to leave this page. Are you sure?";
  }
  return null;
}

onMounted(async () => {
  await store.getTest(Number(params.project), Number(params.test));
  await store.getProject(Number(params.project));
  window.onbeforeunload = confirmExit;
});

const currentIndex = ref(0);
</script>

<template>
  <div>
    <div>
      <header class="flex h-16 z-40 top-0 items-center px-4 border-b sticky border-border bg-background justify-center">
        <nav class="flex items-center justify-center space-x-2">
          <h6 class="text-2xl font-bold tracking-tight p-2">
            <span v-if="alternative">{{ alternative?.alias }} - </span>
            {{ test?.name }}
          </h6>
        </nav>
      </header>
    </div>
    <div class="container">
      <p>
        {{ test?.instructions }}
      </p>
      <form @submit="onSubmit">
        <FormField name="answers">
          <FormItem>
            <div v-if="questions!.length > 0" class="flex flex-wrap">
              <div v-if="test?.type === 'USABILITY'" class="lg:w-1/2 w-full">
                <TestQuestion v-if="questions[currentIndex]" :question="questions[currentIndex]" :index="0"
                  :type="test?.type" :key="questions[currentIndex].index" />
              </div>
              <div v-else-if="test !== null" v-for="(question, index) in questions" :key="question.index"
                class="lg:w-1/2 w-full">
                <TestQuestion :question="question" :index="index" :type="test!.type" />
              </div>
            </div>
            <div v-else-if="!isLoading">questions not found</div>
            <FormMessage />
          </FormItem>
        </FormField>
        <p v-if="Object.entries(errorBag).length" class="text-sm font-medium text-destructive">
          please. validate all answers
        </p>
        <LoadingButton v-if="
          test?.type === 'USABILITY' && currentIndex - 1 < questions.length
        " :disabled="!(questions!.length > 0)" :isLoading="isLoading" class="m-2" type="submit">
          <div>Next</div>
        </LoadingButton>
        <LoadingButton v-else :disabled="!(questions!.length > 0)" :isLoading="isLoading" class="m-2" type="submit">
          <div>Submit</div>
        </LoadingButton>
      </form>
    </div>
  </div>
</template>
