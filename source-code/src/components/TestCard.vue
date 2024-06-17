<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Test } from "@/models/test.model";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const { test } = defineProps<{ test: Test }>();
</script>

<template>
  <Card
    :class="
      cn(
        'm-2 hover:bg-slate-50 hover:cursor-pointer flex flex-col h-52',
        $attrs.class ?? ''
      )
    "
  >
    <CardHeader>
      <CardTitle>{{ test.alias }}</CardTitle>
      <CardDescription>{{ test.name }}</CardDescription>
    </CardHeader>
    <CardContent class="h-24 overflow-hidden">
      <p class="text-ellipsis text-sm text-muted-foreground">
        {{ test.instructions }}
      </p>
    </CardContent>
    <CardFooter></CardFooter>
  </Card>
</template>
