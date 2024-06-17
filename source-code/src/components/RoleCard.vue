<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Role } from "@/models/role.model";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const { role } = defineProps<{ role: Role }>();
</script>

<template>
  <Card :class="cn('m-2 hover:cursor-pointer', $attrs.class ?? '')">
    <CardHeader>
      <CardTitle class="text-sm">{{ role.title }}</CardTitle>
      <CardDescription :class="cn($attrs.class ?? '')">{{
        role.caption
      }}</CardDescription>
    </CardHeader>
  </Card>
</template>
