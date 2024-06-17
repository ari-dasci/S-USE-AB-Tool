<script setup lang="ts">
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from "@/components/ui/tags-input";
import { useTestStore } from "@/store/tests.store";
import { storeToRefs } from "pinia";
import {
  ComboboxAnchor,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
} from "radix-vue";
import { computed, onMounted, ref } from "vue";

const { project } = defineProps<{ project: number }>();

const store = useTestStore();

const { tests } = storeToRefs(store);

const modelValue = ref<string[]>([]);
const open = ref(false);
const searchTerm = ref("");

onMounted(async () => {
  await store.getTests();
  await store.getSelectedByProject(project);
  modelValue.value = store?.selected?.map(String) ?? [];
});

const filteredTests = computed(() =>
  tests.value.filter((i) => !modelValue.value.includes(i.id.toString()))
);

const selectedTest = computed(() =>
  tests.value.filter((i) => modelValue.value.includes(i.id.toString()))
);
</script>

<template>
  <TagsInput class="px-0 gap-0 w-80" :model-value="modelValue">
    <div class="flex gap-2 flex-wrap items-center px-3">
      <TagsInputItem
        v-for="selected in selectedTest"
        :key="selected.id"
        :value="selected.alias"
      >
        <TagsInputItemText> hola </TagsInputItemText>
        <TagsInputItemDelete />
      </TagsInputItem>
    </div>

    <ComboboxRoot
      v-model="modelValue"
      v-model:open="open"
      v-model:searchTerm="searchTerm"
      class="w-full"
    >
      <ComboboxAnchor as-child>
        <ComboboxInput placeholder="tests..." as-child>
          <TagsInputInput
            class="w-full px-3"
            :class="modelValue.length > 0 ? 'mt-2' : ''"
            @keydown.enter.prevent
          />
        </ComboboxInput>
      </ComboboxAnchor>

      <ComboboxPortal>
        <CommandList
          position="popper"
          class="w-[--radix-popper-anchor-width] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <CommandEmpty />
          <CommandGroup>
            <CommandItem
              v-for="test in filteredTests"
              :key="test.id"
              :value="test.alias"
              @select.prevent="
                (ev) => {
                  console.log(ev.detail.value);
                  searchTerm = '';
                  modelValue.push(test.id.toString());
                  store.setTest(project, test.id);

                  open = false;
                }
              "
            >
              {{ test.alias }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </ComboboxPortal>
    </ComboboxRoot>
  </TagsInput>
</template>
