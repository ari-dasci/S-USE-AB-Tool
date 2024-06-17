<script setup lang="ts">
import { refDebounced } from "@vueuse/core";
import { Check, ChevronsUpDown, Loader2 } from "lucide-vue-next";
import { computed, ref, watch } from "vue";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useUsersStore } from "@/store/users.store";
import { storeToRefs } from "pinia";

const store = useUsersStore();

const { users, isLoading } = storeToRefs(store);

const open = ref(false);
const id = ref<number>();
const input = ref("");
const debounced = refDebounced(input, 500);

watch(debounced, (value) => {
  store.searchByTerm(value);
});

const emit = defineEmits<{ select: [value: number] }>();

const selected = computed(() => users.value.find((u) => u.id == id.value));

const onSelect = (value: number) => {
  open.value = false;
  id.value = value;
  emit("select", value);
};
</script>

<template>
  <div>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-[300px] justify-between"
        >
          {{ selected?.name || "Select a user..." }}
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-full p-0">
        <Command class="w-[300px] max-w-full">
          <Input class="w-full" placeholder="Search User..." v-model="input" />
          <CommandEmpty v-if="isLoading" class="flex justify-center gap-2"
            ><Loader2 class="animate-spin" /> Loading...</CommandEmpty
          >
          <CommandEmpty v-else>No user found.</CommandEmpty>
          <CommandList v-if="!isLoading">
            <CommandGroup>
              <CommandItem
                v-for="user in users"
                :key="user.id"
                :value="user.id"
                @select="
                  (ev) => {
                    if (typeof ev.detail.value === 'number') {
                      onSelect(ev.detail.value);
                    }
                  }
                "
              >
                <div class="flex flex-col">
                  <div class="font-medium">{{ user.name }}</div>
                  <div class="text-sm">{{ user.email }}</div>
                </div>
                <Check
                  :class="
                    cn(
                      'ml-auto h-4 w-4',
                      id === user.id ? 'opacity-100' : 'opacity-0'
                    )
                  "
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>
