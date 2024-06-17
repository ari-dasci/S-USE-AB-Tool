<script setup lang="ts">
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTestStore } from "@/store/tests.store";
import { toTypedSchema } from "@vee-validate/zod";
import { storeToRefs } from "pinia";
import { FieldArray, useForm } from "vee-validate";
import { computed, h, onMounted } from "vue";
import { useRoute } from "vue-router";
import * as z from "zod";
import { toast } from "./ui/toast";

const route = useRoute();
const projectId = computed(() => Number(route.params!.id));

const store = useTestStore();
const { tests, selected } = storeToRefs(store);

const displayFormSchema = toTypedSchema(
  z.object({
    items: z.array(z.number()).min(2, {
      message: "You have to select at least 2 item.",
    }),
    values: z.map(z.string(), z.number()),
  })
);

const { handleSubmit, setValues } = useForm({
  validationSchema: displayFormSchema,
  initialValues: {
    items: [],
    values: new Map<string, number>(),
  },
});

onMounted(async () => {
  await store.getTests();
  await store.getSelectedByProject(projectId.value);
  setValues({ items: store.selected });
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
  <!-- <div>
    <h3 class="text-lg font-medium">Display</h3>
    <p class="text-sm text-muted-foreground">
      Turn items on or off to control what's displayed in the app.
    </p>
  </div>
  <Separator /> -->
  <form @submit="onSubmit">
    <FieldArray name="items" v-slot="{ push, remove }" class="space-y-2">
      <FormField name="items" v-slot="{ value }">
        <FormItem>
          <FormLabel>Evaluation test</FormLabel>
          <FormDescription>test used to evaluate your project</FormDescription>
          <Separator class="my-1" />
          <FormField
            v-for="(item, index) in tests"
            :key="item.id"
            :name="`items[${index}]`"
          >
            <FormItem
              :key="item.id"
              class="flex flex-row items-start space-x-3 space-y-0"
            >
              <FormControl>
                <Checkbox
                  :checked="selected?.includes(item.id) ?? false"
                  @update:checked="
                    (checked) => {
                      if (checked) {
                        push(item.id);
                        store.setTest(projectId, item.id);
                      } else {
                        remove(value.indexOf(item.id));
                        store.unsetTest(projectId, item.id);
                      }
                    }
                  "
                />
              </FormControl>
              <FormLabel class="font-normal">
                {{ item.alias }}
              </FormLabel>
            </FormItem>
          </FormField>
        </FormItem>
      </FormField>
    </FieldArray>

    <FormField name="items" v-slot="{ value }">
      <FormItem class="overflow-scroll my-4">
        <FormLabel>Criterian weight rules</FormLabel>
        <FormDescription> Comparative weights per criterian </FormDescription>
        <Separator />
        <Table class="my-4">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead
                v-for="item in tests.filter(
                  (e) => value?.includes(e.id) ?? false
                )"
                :key="item.id"
              >
                {{ item.alias }}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="(item, y) in tests.filter(
                (e) => value?.includes(e.id) ?? false
              )"
              :key="item.id"
            >
              <TableCell> {{ item.alias }} </TableCell>
              <TableCell
                v-for="(item, x) in tests.filter(
                  (e) => value?.includes(e.id) ?? false
                )"
                :key="item.id"
                class="font-medium"
              >
                <Select v-if="x !== y" default-value="1">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a value" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem v-for="i in 5" :key="i" :value="i.toString()">
                        {{ i }} important
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </FormItem>
    </FormField>
  </form>
</template>
